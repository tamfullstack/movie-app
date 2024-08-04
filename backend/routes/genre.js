const express = require("express");

const genreController = require("../controllers/genre");

const router = express.Router();

router.get("/", genreController.getGenreList);

module.exports = router;
