const requireLogin = require("../../middlewares/routes/requireLogin");

module.exports = app => {
	app.get("/api/current_user", requireLogin, (req, res) => {
		res.send(req.user);
	});
};
