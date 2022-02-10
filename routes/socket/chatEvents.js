const _ = require("lodash");
const mongoose = require("mongoose");
const Message = mongoose.model("messages");
const User = mongoose.model("users");
const Room = mongoose.model("rooms");

const webpush = require("web-push");

const simpleStore = require("../../misc/simpleStore");

const [connections, addSocket, removeSocket] = simpleStore();
const [rooms, addRoom, removeRoom] = simpleStore();

module.exports = (io) => {
	io.on("connection", function (socket) {
		const user = socket.request.user;

		if (user) {
			const server = { io, socket, user };
			addSocket(user.id, socket.id);

			//socket.on("join_room", room => onJoinRoom(server, { room}));
			joinRooms(server);

			socket.on("disconnecting", () => onDisconnect({ io, socket, user }));
			socket.on("message", (room, msg) => onMessage(server, { room, msg }));
		}
	});
};

async function onJoinRoom({ io, socket, user }, { room }) {
	try {
		const fetchedUser = await User.findById(user.id);
		if (!fetchedUser.rooms.includes(room)) throw new Error("User not in room");
		socket.join(room);
		addRoom(room, user.id);
		io.to(room).emit("online_users", {
			room: room,
			users: _.uniq(rooms[room]),
		});
	} catch (e) {
		socket.emit("errors", e.message);
	}
}

function joinRooms({ io, socket, user }) {
	user.rooms.forEach((room) => {
		room = room.toString();
		socket.join(room);
		addRoom(room, user.id);
		io.to(room).emit("online_users", {
			room: room,
			users: _.uniq(rooms[room]),
		});
	});
}

function onDisconnect({ io, socket, user }) {
	console.log(socket.adapter.rooms.keys());
	socket.adapter.rooms.forEach((room, key) => {
		removeRoom(key, user.id);
		io.to(key).emit("online_users", {
			room: key,
			users: _.uniq(rooms[key]),
		});
	});
	removeSocket(user.id, socket.id);
}

async function onMessage({ io, socket, user }, { room, msg }) {
	try {
		if (user.rooms.includes(room)) {
			const dbRoom = await Room.findOne({ _id: room }).populate("users");
			const payload = JSON.stringify({
				title: dbRoom.name,
				userName: user.userName,
				body: msg.content,
				icon: `/static/chat-icon-teal.png`,
				badge: `/static/chat-badge.png`,
			});

			dbRoom.users
				.filter((u) => String(u._id) !== String(user._id))
				.forEach((user) => {
					user.pushSubscriptions.forEach((sub) => {
						webpush.sendNotification(JSON.parse(sub), payload).catch((e) => {
							cleanUpSubscription(user, sub);
							console.error(e);
						});
					});
				});

			const message = await new Message({
				user: user,
				room: room,
				content: msg.content,
				createdAt: msg.createdAt,
				status: "SUCCESS",
			}).save();
			io.to(socket.id).emit("message_success", message);
			socket.to(room).emit("message", message);
		}
	} catch (e) {
		console.log(e);
	}
}

async function cleanUpSubscription(user, sub) {
	await User.updateOne({ _id: user._id }, { $pull: { pushSubscriptions: sub } });
	console.log("CLEANED SUBSCRIPTION: " + sub);
}
