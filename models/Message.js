const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  createdAt: { type: Date, default: () => Date.now() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "rooms" },
  content: String,
  status: { type: String, default: "SUCCESS" }
});

mongoose.model("messages", messageSchema);
