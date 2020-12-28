import React from 'react'
import { Link, graphql } from 'gatsby'

const PostTemplate = ({ data }) => {
  const frontmatter = data.markdownRemark.frontmatter
  const html = data.markdownRemark.html

  return (
    <>
      <div>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <Link to='/'>Back to Index</Link>
    </>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        places {
          name
          longitude
          latitude
        }
      }
    }
  }
`