import React from "react"
import { Link } from "gatsby"
import "../styles/style.css"

const Post = ({ post }) => {
  return (
    <div className="post-item">
      <Link to={`post/${post.slug}`}>
        <div>{post.title}</div>
      </Link>
      <div className="date">{post.date}</div>
    </div>
  )
}
const Homepage = ({ data }) => {
  const posts = data.allWordpressPost.edges;

  return (
    <div>
      <div className="header-container">
        <h1>Posts</h1>
      </div>
      <div className="posts-container">
        {posts
          .map(post => {
            return <Post key={post.node.id} post={post.node} />
          })}
      </div>
    </div>
  )
}

export const query = graphql`
  {
    allWordpressPost(filter: {acf: {don_t_show_the_post_on_the_homepage: {eq: null}}}) {
      edges {
        node {
          id,
          content
          slug
          id
          date
          title
        }
      }
    }
  }
`
export default Homepage
