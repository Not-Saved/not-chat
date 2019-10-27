const _ = require("lodash");
const mongoose = require("mongoose");
const Room = mongoose.model("rooms");

const requireLogin = require("../../middlewares/requireLogin");

module.exports = app => {
	app.get("/api/rooms", requireLogin, async (req, res) => {
		try {
			const rooms = await Room.find({ users: req.user.id }).populate("users");
			res.send(rooms);
		} catch (e) {
			res.status(400).send(e);
		}
	});

	app.get("/api/rooms/:id", requireLogin, async (req, res) => {
		try {
			const { id } = req.params;
			const room = await Room.findById(id).populate("users");
			res.send(room);
		} catch (e) {
			res.status(400).send(e);
		}
	});

	app.post("/api/rooms", requireLogin, async (req, res) => {
		try {
			const { roomName } = req.body;
			const { user } = req;

			const room = await new Room({
				name: roomName,
				users: req.user
			}).save();

			user.rooms.push(room);
			await user.save();

			res.send(user);
		} catch (e) {
			console.log(e);
			res.status(400).send(e);
		}
	});

	app.post("/api/rooms/:id", requireLogin, async (req, res) => {
		try {
			const { id } = req.params;
			const { user } = req;

			const room = await Room.findOneAndUpdate(
				{ _id: id },
				{ $addToSet: { users: req.user } },
				{ new: true }
			).populate("users");
			if (!room) throw "Room doesn't exist";

			user.rooms = _.uniqWith([room._id, ...user.rooms], _.isEqual);
			await user.save();

			res.send(user);
		} catch (e) {
			console.log(e);
			res.status(400).send(e);
		}
	});

	app.delete("/api/rooms/:id", requireLogin, async (req, res) => {
		try {
			const { id } = req.params;
			const { user } = req;

			const room = await Room.findOneAndUpdate(
				{ _id: id },
				{ $pull: { users: req.user._id } },
				{ new: true }
			).populate("users");
			if (!room) throw "Room doesn't exist";

			user.rooms = user.rooms.filter(room => String(room) !== id);
			await user.save();

			res.send(room);
		} catch (e) {
			console.log(e);
			res.status(400).send(e);
		}
	});
};
