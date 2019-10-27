const keys = require("./config/keys");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");

require("./models/User");
require("./models/Room");
require("./models/Message");
require("./services/passport");

const session = expressSession({
	store: new MongoStore({ url: keys.mongoURI }),
	secret: keys.cookieKey,
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
});
const passportInit = passport.initialize();
const passportSess = passport.session();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.use(function(socket, next) {
	session(socket.request, socket.request.res, () => {
		passportInit(socket.request, socket.request.res, () => {
			passportSess(socket.request, socket.request.res, () => {
				if (socket.request.user) next();
			});
		});
	});
});

app.use(bodyParser.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/http/authRoutes")(app);
require("./routes/http/currentUserRoutes")(app);
require("./routes/http/roomRoutes")(app);
require("./routes/socket/chatRoutes")(io);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

mongoose.connect(keys.mongoURI, { useFindAndModify: false });
http.listen(process.env.PORT || 5000);
