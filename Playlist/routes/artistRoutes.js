const express = require("express"),
  cors = require("cors");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { createArtist, getArtist, getArtists } = require("../controller/artistController");


router
  .post("/artists", createArtist)
  .get("/artists", getArtists)
  .get("/artist/:id", getArtist)
  .put("/artist/:id", () => {})
  .delete("/artist/:id", () => {});

exports.artistRoutes = router;
