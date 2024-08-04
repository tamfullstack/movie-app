import React, { memo, useEffect, useState } from "react";
import requestApi from "../../utils/requestApi";
import requests from "../../utils/requests";
import styles from "./MovieList.module.css";
import imageUrl from "../../utils/imageUrl";
import MovieDetail from "../MovieDetail/MovieDetail";

function MovieList(props) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    info: undefined,
    trailer: undefined,
  });

  const { title, type, original } = props;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(requestApi(requests[type]));
        const data = await res.json();

        if (res.status === 200) {
          setMovies(data.results);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [type]);

  // Hàm handle
  const handleSelectMovie = (movie) => {
    if (selectedMovie.info?.id === movie.id) {
      setSelectedMovie({ info: null, trailer: null });
    } else {
      const fetchMovieTrailer = async () => {
        try {
          const res = await fetch(requestApi(requests["fetchMovieTrailer"]), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ film_id: movie.id }),
          });
          const data = await res.json();

          if (res.status === 200) {
            setSelectedMovie({ info: movie, trailer: data });
          } else {
            setSelectedMovie({ info: movie, trailer: null });
            throw new Error(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchMovieTrailer();
    }
  };

  // Hàm render
  const renderMovies = (limit) => {
    const path = original ? "poster_path" : "backdrop_path";

    return movies?.map((movie) => (
      <img
        src={imageUrl(movie[path])}
        alt={movie?.title || movie?.name || movie?.original_name}
        key={movie?.id}
        onClick={() => handleSelectMovie(movie)}
      />
    ));
  };

  const renderMovieDetail = () => {
    return selectedMovie.info && <MovieDetail movie={selectedMovie} />;
  };

  return (
    <div className={styles["movie-list"]}>
      <h2>{title}</h2>
      <div className={`${styles.movies} ${original ? styles.large : ""}`}>
        {renderMovies(10)}
      </div>
      <div className={styles.detail}>{renderMovieDetail()}</div>
    </div>
  );
}

export default memo(MovieList);
