const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Video = require("../models/Video");

exports.getOrginalMovies = (req, res, next) => {
  const page = +req.query.page || 1;

  Movie.fetchOrginalMovies(page, (results, page, totalPages) => {
    res.status(200).json({
      results,
      page,
      total_pages: totalPages,
    });
  });
};

exports.getTrendingMovies = (req, res, next) => {
  const page = +req.query.page || 1;

  Movie.fetchTrendingMovies(page, (results, page, totalPages) => {
    res.status(200).json({
      results,
      page,
      total_pages: totalPages,
    });
  });
};

exports.getTopRateMovies = (req, res, next) => {
  const page = +req.query.page || 1;

  Movie.fetchTopRateMovies(page, (results, page, totalPages) => {
    res.status(200).json({
      results,
      page,
      total_pages: totalPages,
    });
  });
};

exports.getMoviesByGenre = (req, res, next) => {
  const genreId = +req.query.genre;
  const page = +req.query.page || 1;

  if (!genreId) {
    const error = new Error("Not found gerne parram");
    error.statusCode = 400;
    next(error);
  } else {
    Genre.fetchById(genreId, (genre) => {
      if (!genre) {
        const error = new Error("Not found that gerne id");
        error.statusCode = 400;
        next(error);
      } else {
        Movie.fetchMoviesByGenre(
          page,
          genre,
          (results, page, totalPages, genreName) => {
            res.status(200).json({
              results,
              page,
              total_pages: totalPages,
              genre_name: genreName,
            });
          }
        );
      }
    });
  }
};

exports.postMovieTrailer = (req, res, next) => {
  const filmId = +req.body.film_id;

  if (!filmId) {
    const error = new Error("Not found film_id parram");
    error.statusCode = 400;
    next(error);
  } else {
    Video.fetchMovieTrailer(filmId, (trailer) => {
      if (!trailer) {
        const error = new Error("Not found video");
        error.statusCode = 404;
        next(error);
      } else {
        res.status(200).json(trailer);
      }
    });
  }
};

exports.postSearchMovies = (req, res, next) => {
  const params = req.body;
  const keyword = params.keyword.trim();
  const page = +req.query.page || 1;

  if (!keyword) {
    const error = new Error("Not found keyword parram");
    error.statusCode = 400;
    next(error);
  } else {
    Movie.fetchSearchMovies(page, params, (results, page, totalPages) => {
      res.status(200).json({
        results,
        page,
        total_pages: totalPages,
      });
    });
  }
};
