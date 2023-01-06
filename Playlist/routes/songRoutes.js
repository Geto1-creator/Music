const express = require("express"),
  cors = require("cors");
const { createSong, getSong, deleteSong } = require("../controller/songController");
const router = express.Router();

router
  .post("/songs", createSong)
  .get("/songs", getSong)
  .put("/song/:id", () => { })
  .delete("/song/:id", deleteSong)

exports.songRoutes = router;
