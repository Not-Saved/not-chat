const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");

//CREATE SERVER INSTANCE
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { path: "/ws/socket.io" });

//IMPORT MONGOOSE MODELS
require("./models");

//IMPORT PASSPORT SERVICE
require("./services/passport");

//ADD PARSING MIDDLEWARES
require("./middlewares/server/request")(app);

//ADD SESSION MIDDLEWARES
require("./middlewares/server/session")(app, io);

//IMPORT SERVER ROUTES AND WS EVENTS HANDLERS
require("./routes")(app, io);

//SERVE STATIC FILES
require("./middlewares/server/static")(app);

//CONNECT TO MONGODB AND START SERVER
mongoose.connect(keys.mongoURI, { useFindAndModify: false });
http.listen(process.env.PORT || 5000);
