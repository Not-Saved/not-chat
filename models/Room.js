const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
	name: String,
	createdAt: { type: Date, default: () => Date.now() },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }]
});

mongoose.model("rooms", roomSchema);
