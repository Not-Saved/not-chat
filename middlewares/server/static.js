const express = require("express");

module.exports = app => {
	app.use("/uploads", express.static("uploads"));
	if (process.env.NODE_ENV === "production") {
		app.use(express.static("client/build"));

		const path = require("path");
		app.get("*", (req, res) => {
			res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
		});
	}
};
