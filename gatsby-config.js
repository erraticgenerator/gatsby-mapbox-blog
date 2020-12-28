module.exports = {
  pathPrefix: "/gatsby-mapbox-blog", // this is for demo site. remove for your project
  siteMetadata: {
    title: `Gatsby Mapbox Blog`,
    description: ``,
    author: `Erratic Generator`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
