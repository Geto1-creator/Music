const { Schema, Types, model } = require("mongoose");
const { isEmail, isString } = require("validator");

const playlistSchema = new Schema({
  title: {
    type: String,
    required: true,
    // validate: [isString, "Please enter correct value"],
    unique: true,
  },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now() },
  isPrivate: { type: Boolean, default: false },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
});

const Playlist = model("Playlist", playlistSchema);

exports.Playlist = Playlist;
