const _ = require("lodash");
const mongoose = require("mongoose");
const Message = mongoose.model("messages");

module.exports = io => {
	io.on("connection", function(socket) {
		const user = socket.request.user;
		if (user) {
			socket.on("join_room", roomId => onJoinRoom(io, user, socket, roomId));

			socket.on("message", (roomId, msg) => onMessage(io, user, roomId, msg));

			socket.on("disconnect", () => onDisconnect(io, user));
		}
	});
};

function onJoinRoom(io, user, socket, roomId) {
	try {
		const connUsers = Object.values(io.engine.clients).map(e => e.request.user.id);
		if (user.rooms.includes(roomId)) {
			socket.join(roomId);
			const message = new Message({
				user: user,
				room: roomId,
				content: `${user.userName} connected`
			});
			if (connUsers.filter(e => e === user.id).length <= 1) {
				io.to(roomId).emit("message", message);
			}
			io.to(roomId).emit("online_users", _.uniq(connUsers));
		} else {
			throw new Error("User not in room");
		}
	} catch (e) {
		socket.emit("errors", e.message);
	}
}

async function onMessage(io, user, roomId, msg) {
	if (user.rooms.includes(roomId)) {
		const message = await new Message({
			user: user,
			room: roomId,
			content: msg
		}).save();
		io.to(roomId).emit("message", message);
	}
}

function onDisconnect(io, user) {
	const connUsers = Object.values(io.engine.clients).map(e => e.request.user.id);
	user.rooms.forEach(room => {
		const message = new Message({
			user: user,
			room: room,
			content: `${user.userName} disconnected`
		});
		if (!connUsers.filter(e => e === user.id).length) {
			io.to(room).emit("message", message);
		}
		io.to(room).emit("online_users", _.uniq(connUsers));
	});
}
