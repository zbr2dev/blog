import React from "react"
import { Link } from "gatsby"
import "./style.css"

const Post = ({ post }) => {
  console.log(post)
  return (
    <div className="post-item">
      <Link to={`post/${post.slug}`}>
        <div>{post.title}</div>
      </Link>
      <div className="date">{post.date}</div>
    </div>
  )
}
const Homepage = ({ pageContext }) => {
  return (
    <div>
      <div className="header-container">
        dsmkdklsdsdksdsd
        <h1>Posts</h1>
      </div>

      <div className="posts-container">
        {pageContext.posts
          .filter(post => post.visibleOnHomePage)
          .map(post => {
            return <Post post={post} />
          })}
      </div>
    </div>
  )
}
export default Homepage
