const { Playlist } = require("../models/playlistModels");
const { Song } = require("../models/songModel");

const handleErrors = (error) => {
  console.log(error.message, error.code);
  let err = { title: "" };

  if (error.message.includes("user validation failed")) {
    console.log(Object.values(error.errors));
  }
};
exports.createPlaylist = async (req, res) => {
  const body = req.body;
  console.log(body);
  // const result = await new Playlist(body).save();
  // res.send(result);
  try {
    const playlist = await Playlist.create(body);
    res.status(201).json(playlist);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send("playlist not created");
  }
};

exports.getPlaylists = async (req, res) => {
  const result = await Playlist.find({});
  res.send(result);
};

exports.getPlaylist = async (req, res) => {
  const result = await Playlist.findById(req.params.id).populate("songs");

  res.send(result);
};
exports.deletePlaylist = async (req, res) => {
  const id = req.params.id;
  await Playlist.findByIdAndDelete({ _id: id });
  res.send("Deleted");
};

exports.addToPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const songId = req.body.id;

  const playlist = await Playlist.findById(playlistId);
  playlist.songs.push(songId);
  await playlist.save();
  res.send(playlist);
};

