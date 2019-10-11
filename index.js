const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
	console.log("a user connected");

	socket.on("disconnect", function() {
		console.log("user disconnected");
	});

	socket.on("chat message", function(msg) {
		io.emit("chat message", msg);
	});
});

app.use(bodyParser.json());

app.use(express.static("client"));

http.listen(process.env.PORT || 5000);
