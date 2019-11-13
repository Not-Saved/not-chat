const keys = require("./config/keys");
const express = require("express");
const gatsyExpress = require("gatsby-plugin-express");
const mongoose = require("mongoose");

//CREATE SERVER INSTANCE
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { path: "/ws/socket.io" });

//IMPORT MONGOOSE MODELS
require("./models");

//IMPORT PASSPORT SERVICE
require("./services/passport");

//ADD PARSING MIDDLEWARE
require("./middlewares/server/request")(app);

//ADD SESSION MIDDLEWARE
require("./middlewares/server/session")(app, io);

//ADD COMPRESSION MIDDLEWARE
require("./middlewares/server/compression")(app);

//IMPORT SERVER ROUTES AND WS EVENTS HANDLERS
require("./routes")(app, io);

//SERVE STATIC FILES
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

//CONNECT TO MONGODB AND START SERVER
mongoose.connect(keys.mongoURI, { useFindAndModify: false });
http.listen(process.env.PORT || 5000);
