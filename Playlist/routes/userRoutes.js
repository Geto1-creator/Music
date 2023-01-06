const express = require("express"),
  cors = require("cors");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { createUser, getUsers, getUser, loginUser, addPlaylistToUser, addToFavPlaylist } = require("../controller/userController");

router
  .post("/users", createUser)
  .post("/login", loginUser)
  .get("/users", getUsers)
  .get("/user/:id", getUser)
  .put("/user/:id", addPlaylistToUser)
  .put("/user/favplaylist/:id", addToFavPlaylist)
  .delete("/user/:id", () => { });

exports.userRoutes = router;
