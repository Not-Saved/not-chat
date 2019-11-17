const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  userName: String,
  createdAt: { type: Date, default: () => Date.now() },
  picture: { type: String },
  lastSignedIn: { type: Date, default: () => Date.now() },
  rooms: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "rooms" }],
    default: []
  },
  pushSubscriptions: { type: [String], default: [] }
});

mongoose.model("users", userSchema);
