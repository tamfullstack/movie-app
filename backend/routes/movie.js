const express = require("express");

const isAuth = require("../middleware/isAuth");
const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/original", isAuth, movieController.getOrginalMovies);
router.get("/trending", isAuth, movieController.getTrendingMovies);
router.get("/top-rate", isAuth, movieController.getTopRateMovies);
router.get("/discover", isAuth, movieController.getMoviesByGenre);
router.post("/video", isAuth, movieController.postMovieTrailer);
router.post("/search", isAuth, movieController.postSearchMovies);

module.exports = router;
