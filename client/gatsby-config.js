var proxy = require("http-proxy-middleware")

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // `gatsby-plugin-offline`,
  ],
  developMiddleware: app => {
    app.use(proxy("/oauth/google", { target: "http://localhost:5000" }))
    app.use(proxy("/api/**", { target: "http://localhost:5000" }))
    app.use(proxy("/ws/**", { target: "http://localhost:5000", ws: true }))
    app.use(proxy("/uploads/**", { target: "http://localhost:5000" }))
  },
}
