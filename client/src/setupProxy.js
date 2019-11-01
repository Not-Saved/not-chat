const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	app.use(proxy("/oauth/google", { target: "http://localhost:5000" }));
	app.use(proxy("/api/**", { target: "http://localhost:5000" }));
	app.use(proxy("/ws/**", { target: "http://localhost:5000", ws: true }));
	app.use(proxy("/uploads/**", { target: "http://localhost:5000" }));
};
