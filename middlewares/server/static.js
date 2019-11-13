const express = require("express");
const gatsyExpress = require("gatsby-plugin-express");

module.exports = app => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/public"));
    app.use(
      gatsyExpress("client/config/gatsby-express.json", {
        publicDir: "client/public/",
        template: "client/public/404/index.html",
        redirectSlashes: true
      })
    );
  }
};
