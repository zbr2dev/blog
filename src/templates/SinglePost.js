import React from "react"
import { graphql } from "gatsby"
import "../styles/style.css"

export const postQuery = graphql`
   query($id: String!) {
     wordpressPost(id: { eq: $id }) {
       title
       content
     }
     site {
       siteMetadata {
         title
         description
       }
     }
   } `


const Post = ({ data }) => {
  const pageContent = data.wordpressPost;
  return (
    <div className='item-container'>
      <h1>{pageContent.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
    </div>
  )
}
export default Post

