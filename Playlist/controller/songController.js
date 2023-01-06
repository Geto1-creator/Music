const { Song } = require("../models/songModel");

exports.createSong = async (req, res) => {
  const body = req.body;
  const result = await new Song(body).save();
  res.send(result);
};
exports.getSong = async (req, res) => {
  const playlistId = req.query.playlistId;

  if (playlistId) {
    const result = await Song.find({ playlistId });
    res.send(result);
    return  
  }
  const result = await Song.find({});
  res.send(result);
};
exports.deleteSong = async (req, res) => {
  const songId = req.params.id
  await Song.findOneAndDelete({ _id: songId })
  res.send('deleted')
}
