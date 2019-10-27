module.exports = (app, io) => {
	require("./http/authRoutes")(app);
	require("./http/currentUserRoutes")(app);
	require("./http/roomRoutes")(app);
	require("./http/messageRoutes")(app);
	require("./socket/chatEvents")(io);
};
