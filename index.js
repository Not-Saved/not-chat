const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");

//CREATE SERVER INSTANCE
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//IMPORT MONGOOSE MODELS
require("./models");

//IMPORT PASSPORT SERVICE
require("./services/passport");

//ADD SERVER MIDDLEWARES (SESSION, BODYPARSER...)
require("./middlewares/serverMiddlewares")(app, io);

//IMPORT SERVER ROUTES
require("./routes")(app, io);

//SERVE HTML IN PRODUCTION
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//CONNECT TO MONGODB AND START SERVER
mongoose.connect(keys.mongoURI, { useFindAndModify: false });
http.listen(process.env.PORT || 5000);
