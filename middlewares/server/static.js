const express = require("express");
const path = require("path");

module.exports = app => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/public"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "public", "404.html"));
    });
  }
};
