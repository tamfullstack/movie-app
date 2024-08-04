import { TOKEN } from "./constants";

const requests = {
  fetchTrending: `/movies/trending?token=${TOKEN}`,
  fetchNetflixOriginals: `/movies/original?token=${TOKEN}`,
  fetchTopRated: `/movies/top-rate?token=${TOKEN}`,
  fetchActionMovies: `/movies/discover?token=${TOKEN}&genre=28`,
  fetchComedyMovies: `/movies/discover?token=${TOKEN}&genre=35`,
  fetchHorrorMovies: `/movies/discover?token=${TOKEN}&genre=27`,
  fetchRomanceMovies: `/movies/discover?token=${TOKEN}&genre=10749`,
  fetchDocumentaries: `/movies/discover?token=${TOKEN}&genre=99`,
  fetchMovieTrailer: `/movies/video?token=${TOKEN}`,
  fetchSearch: `/movies/search?token=${TOKEN}`,
};

export default requests;
