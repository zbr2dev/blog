import React from "react"
const Post = ({ pageContext }) => {
  return (
    <div className='item-container'>
      <h1>{pageContext.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
    </div>
  )
}
export default Post
