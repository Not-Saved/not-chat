const passport = require("passport");

module.exports = (app) => {
	app.get("/oauth/google", passport.authenticate("google", { scope: ["profile"] }));

	app.get("/oauth/google/redirect", passport.authenticate("google"), (req, res) => {
		res.redirect("/");
	});

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});
};
