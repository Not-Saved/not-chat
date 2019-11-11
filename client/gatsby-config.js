var proxy = require("http-proxy-middleware")

module.exports = {
  siteMetadata: {
    title: `Not-Chat`,
    description: `Chat app created using Gatsby`,
    author: `Not-Saved`,
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
        name: `Not-Chat`,
        short_name: `Not-Chat`,
        start_url: `/`,
        background_color: `teal`,
        theme_color: `teal`,
        display: `standalone`,
        icon: `src/images/chat-icon-teal.png`, // This path is relative to the root of the site.
        theme_color_in_head: false,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Lato",
              variants: ["300", "400", "500"],
            },
          ],
        },
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
