const keys = require("../config/keys");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);

const session = expressSession({
	store: new MongoStore({ url: keys.mongoURI }),
	secret: keys.cookieKey,
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
});
const passportInit = passport.initialize();
const passportSess = passport.session();

module.exports = (app, io) => {
	io.use((socket, next) => session(socket.request, socket, next));
	io.use((socket, next) => passportInit(socket.request, socket, next));
	io.use((socket, next) => passportSess(socket.request, socket, next));

	app.use(bodyParser.json());
	app.use(session);
	app.use(passportInit);
	app.use(passportSess);
};
