import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`

const PostList = () => {
  const data = useStaticQuery(query)
  const nodes = data.allMarkdownRemark.nodes

  return (
    <ul
      style={{
        listStyleType: "none",
        padding: 0,
      }}
    >
      {nodes.map(node => {
        const title = node.frontmatter.title
        return (
          <li key={title}>
            <Link to={node.fields.slug}>{title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default PostList
