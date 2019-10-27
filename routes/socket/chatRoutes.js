const mongoose = require("mongoose");
const Room = mongoose.model("rooms");
const Message = mongoose.model("messages");

module.exports = io => {
	io.on("connection", function(socket) {
		const user = socket.request.user;
		if (user) {
			socket.on("join_room", roomId => onJoinRoom(socket, io, roomId, user));

			socket.on("message", (roomId, msg) =>
				onMessage(socket, io, roomId, msg, user)
			);

			socket.on("disconnect", () => onDisconnect(socket, io, user));
		}
	});
};

async function onJoinRoom(socket, io, roomId, user) {
	try {
		socket.allRooms = socket.allRooms ? [...socket.allRooms, roomId] : [roomId];
		const room = await Room.findOne({ _id: roomId, users: user._id });
		if (room) {
			socket.join(roomId);
			const message = new Message({
				user: user,
				room: roomId,
				content: `${user.userName} connected`
			});
			io.to(roomId).emit("message", message);
		} else {
			throw new Error("User not in room");
		}
	} catch (e) {
		socket.emit("errors", e.message);
	}
}

async function onMessage(socket, io, roomId, msg, user) {
	if (socket.allRooms && socket.allRooms.includes(roomId)) {
		const message = new Message({
			user: user,
			room: roomId,
			content: msg
		});
		io.to(roomId).emit("message", message);
	}
}

function onDisconnect(socket, io, user) {
	const allRooms = socket.allRooms || [];
	allRooms.forEach(room => {
		const message = new Message({
			user: user,
			room: room,
			content: `${user.userName} disconnected`
		});
		io.to(room).emit("message", message);
	});
}
