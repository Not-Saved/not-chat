const keys = require("../../config/keys");
const passport = require("passport");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");

const session = expressSession({
	store: MongoStore.create({ mongoUrl: keys.mongoURI }),
	secret: keys.cookieKey,
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
});
const passportInit = passport.initialize();
const passportSess = passport.session();

module.exports = (app, io) => {
	io.use((socket, next) => session(socket.request, socket, next));
	io.use((socket, next) => passportInit(socket.request, socket, next));
	io.use((socket, next) => passportSess(socket.request, socket, next));

	app.use(session);
	app.use(passportInit);
	app.use(passportSess);
};
