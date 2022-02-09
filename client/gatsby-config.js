var { createProxyMiddleware } = require("http-proxy-middleware")

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
        background_color: `#695272`,
        theme_color: `#695272`,
        display: `standalone`,
        icon: `src/images/chat-icon-teal.png`, // This path is relative to the root of the site.
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
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: `src/custom-sw-code.js`,
      },
    },
  ],
  developMiddleware: app => {
    app.use(
      createProxyMiddleware("/oauth/google", {
        target: "http://localhost:5000",
      })
    )
    app.use(
      createProxyMiddleware("/api/**", { target: "http://localhost:5000" })
    )
    app.use(
      createProxyMiddleware("/ws/**", {
        target: "http://localhost:5000",
        ws: true,
      })
    )
    app.use(
      createProxyMiddleware("/uploads/**", { target: "http://localhost:5000" })
    )
  },
}
