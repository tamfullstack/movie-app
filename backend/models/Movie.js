const fs = require("fs");
const path = require("path");

const getMoviesFromFile = (cb) => {
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "movieList.json"
  );

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const fetchMovies = (movies, page, cb, genreName) => {
  const totalPages = Math.ceil(movies.length / 20);
  const resultsPage = page >= totalPages ? totalPages : page;
  const resultsStartIndex = (resultsPage - 1) * 20;
  const results = movies.slice(resultsStartIndex, resultsStartIndex + 20);

  cb(results, resultsPage, totalPages, genreName);
};

module.exports = class Movie {
  static fetchOrginalMovies(page, cb) {
    getMoviesFromFile((movies) => {
      fetchMovies(movies, page, cb);
    });
  }

  static fetchTrendingMovies(page, cb) {
    getMoviesFromFile((movies) => {
      let trendingMovies = [...movies];
      trendingMovies.sort((a, b) => b.popularity - a.popularity);

      fetchMovies(trendingMovies, page, cb);
    });
  }

  static fetchTopRateMovies(page, cb) {
    getMoviesFromFile((movies) => {
      let topRateMovies = [...movies];
      topRateMovies.sort((a, b) => b.vote_average - a.vote_average);

      fetchMovies(topRateMovies, page, cb);
    });
  }

  static fetchMoviesByGenre(page, gerne, cb) {
    getMoviesFromFile((movies) => {
      const fetchedMovies = movies.filter((movie) =>
        movie.genre_ids.includes(gerne.id)
      );

      fetchMovies(fetchedMovies, page, cb, gerne.name);
    });
  }

  static fetchSearchMovies(page, params, cb) {
    const keyword = params.keyword.trim().toLowerCase();
    const genreId = params.genre;
    const { year, mediaType, language } = params;

    const checkYear = (date) => {
      const fixedDate = new Date(date);
      return fixedDate.getFullYear() === +year;
    };

    getMoviesFromFile((movies) => {
      const searchedMovies = movies.filter((movie) => {
        const hasKeyword =
          movie.title?.toLowerCase().includes(keyword) ||
          movie.original_title?.toLowerCase().includes(keyword) ||
          movie.name?.toLowerCase().includes(keyword) ||
          movie.original_name?.toLowerCase().includes(keyword) ||
          movie.overview?.toLowerCase().includes(keyword);

        const checkedGenre = !genreId || movie.genre_ids?.includes(+genreId);

        const checkedYear =
          !year ||
          checkYear(movie.release_date) ||
          checkYear(movie.first_air_date);

        const checkedMediaType =
          !mediaType || mediaType === "all" || movie.media_type === mediaType;

        const checkedLanguage =
          !language || movie.original_language === language;

        return (
          hasKeyword &&
          checkedGenre &&
          checkedYear &&
          checkedMediaType &&
          checkedLanguage
        );
      });

      fetchMovies(searchedMovies, page, cb);
    });
  }
};
