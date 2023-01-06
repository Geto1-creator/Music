const { Schema, Types, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    // validator: [isEmail, "Please enter a valid email"],
  },
  // fbId: { type: Schema.Types.ObjectId, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
  favouritePlaylists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
});

const User = model("User", userSchema);

exports.User = User;
