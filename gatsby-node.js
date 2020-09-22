const fetch = require("isomorphic-fetch")
const _ = require("lodash")
exports.createPages = async ({ actions: { createPage } }) => {
  let page = 1
  let globalPosts = []
  while (page < 4) {
    const postsResponse = await fetch(
      `https://nopanic.bar/wp-json/wp/v2/posts?per_page=100&page=${page}`
    )
    page++
    if (postsResponse.ok) {
      let postsJson = await postsResponse.json()
      globalPosts = globalPosts.concat(postsJson)
    } else {
      console.log("HTTP Error: " + postsResponse.status)
    }
  }
  console.log(globalPosts.length)
  const posts = []
  _.forEach(globalPosts, postJson => {
    posts.push(
      _.pick(postJson, ["id", "date", "slug", "title", "content", "acf"])
    )
  })
  _.forEach(posts, post => {
    createPage({
      path: `/post/${post.slug}`,
      component: require.resolve("./src/templates/post.js"),
      context: {
        title: post.title.rendered,
        content: post.content.rendered,
        visibleOnHomePage: !Boolean(
          post.acf["don’t_show_the_post_on_the_homepage"]
        ),
      },
    })
  })
  const postsToHomepage = _.map(
    _.map(posts, o => {
      return {
        ...o,
        title: o.title.rendered,
        content: o.content.rendered,
        visibleOnHomePage: !Boolean(
          o.acf["don’t_show_the_post_on_the_homepage"]
        ),
      }
    }),
    o => _.pick(o, ["id", "date", "slug", "title", "visibleOnHomePage"])
  )
  createPage({
    path: "/",
    component: require.resolve("./src/templates/homepage.js"),
    context: {
      posts: postsToHomepage,
    },
  })
}
