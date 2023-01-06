const { Artist } = require("../models/artistModel");
const { Playlist } = require("../models/playlistModels");
const { Song } = require("../models/songModel");

exports.createArtist = async (req, res) => {
  const body = req.body;
  const result = await new Artist(body).save();
  res.send(result);
};

exports.getArtists = async (req, res) => {
  const result = await Artist.find({});
  res.send(result);
};

exports.getArtist = async (req, res) => {
  const id = req.params.id;
  const result = await Artist.findById({ _id: id });
  res.send(result);
};
