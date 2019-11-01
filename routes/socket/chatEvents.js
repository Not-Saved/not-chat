const _ = require("lodash");
const mongoose = require("mongoose");
const Message = mongoose.model("messages");

module.exports = io => {
	io.on("connection", function(socket) {
		const user = socket.request.user;
		if (user) {
			socket.on("join_room", roomId => onJoinRoom(io, user, socket, roomId));

			socket.on("disconnecting", () => onDisconnect(io, user, socket));

			socket.on("message", (roomId, msg) => onMessage(io, user, roomId, msg));
		}
	});
};

function onJoinRoom(io, user, socket, roomId) {
	try {
		if (!user.rooms.includes(roomId)) throw new Error("User not in room");
		socket.join(roomId, () => {
			if (getCurrentUserConnections(io, roomId, user) === 1) {
				const message = new Message({
					room: roomId,
					content: `${user.userName} connected`
				});

				io.to(roomId).emit("message", message);
			}

			io.to(roomId).emit("online_users", getRoomConnectedUsers(io, roomId));
		});
	} catch (e) {
		socket.emit("errors", e.message);
	}
}

function onDisconnect(io, user, socket) {
	const userRooms = Object.values(socket.rooms);
	userRooms.forEach(room => {
		if (getCurrentUserConnections(io, room, user) === 1) {
			const message = new Message({
				room: room,
				content: `${user.userName} disconnected`
			});
			io.to(room).emit("message", message);
		}

		io.to(room).emit(
			"online_users",
			getRoomConnectedUsers(io, room).filter(e => e !== user.id)
		);
	});
}

function getRoomConnectedUsers(io, roomId) {
	const connections = Object.values(io.sockets.sockets);
	const roomConnections = connections.filter(e => Boolean(e.rooms[roomId]));
	const roomUsers = roomConnections.map(e => e.client.request.user.id);
	const uniqueRoomsUsers = _.uniq(roomUsers);
	return uniqueRoomsUsers;
}

function getCurrentUserConnections(io, roomId, user) {
	const connections = Object.values(io.sockets.sockets);
	const roomConnections = connections.filter(e => Boolean(e.rooms[roomId]));
	const roomUsers = roomConnections.map(e => e.client.request.user.id);
	return roomUsers.filter(e => e === user.id).length;
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
