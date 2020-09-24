const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            acf {
              don_t_show_the_post_on_the_homepage
            }
            content
            slug
            id
            date
            title
          }
        }
    }
  }
  `)

  // Check for any errors
  if (result.errors) {
    console.error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressPost } = result.data

  const postTemplate = path.resolve(`./src/templates/SinglePost.js`);

  allWordpressPost.edges.forEach(edge => {
    console.log(edge.node.slug);
    createPage({
      path: `/post/${edge.node.slug}/`,
      component: postTemplate,
      context: {
        id: edge.node.id,
      },
    })
  });

  //Creating HomePage
  const homePageTemplate = path.resolve(`./src/pages/index.js`)
  
  createPage({
    path: "/",
    component: homePageTemplate,
});
}
