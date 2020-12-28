const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/postTemplate.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

// issue when deploying Mapbos GL JS
// https://github.com/mapbox/mapbox-gl-js/issues/4359

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     module: {
//       noParse: /(mapbox-gl)\.js$/,
//     },
//   })
// }
