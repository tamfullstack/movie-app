const Genre = require("../models/Genre");

exports.getGenreList = (req, res, next) => {
  Genre.fetchAll((genreList) => {
    res.status(200).json(genreList);
  });
};
