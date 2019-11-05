const express = require("express");

module.exports = app => {
	if (process.env.NODE_ENV === "production") {
		app.use(express.static("client/public"));
	}
};
