import React, { memo, useEffect, useState } from "react";
import styles from "./ResultList.module.css";
import imageUrl from "../../utils/imageUrl";
import MovieDetail from "../MovieDetail/MovieDetail";
import requestApi from "../../utils/requestApi";
import requests from "../../utils/requests";

function ResultList(props) {
  const [results, setResults] = useState([]);
  const { movies, selectedMovie, onSelectMovie } = props;

  useEffect(() => {
    setResults(movies);
  }, [movies]);

  // Hàm handle
  const handleSelectMovie = (movie) => {
    if (selectedMovie.info?.id === movie.id) {
      onSelectMovie({ info: null, trailer: null });
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
            onSelectMovie({ info: movie, trailer: data });
          } else {
            onSelectMovie({ info: movie, trailer: null });
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
  const renderResults = () => {
    return results.map((result) => (
      <img
        src={imageUrl(result?.poster_path)}
        alt={result?.title || result?.name || result?.original_name}
        key={result?.id}
        onClick={() => {
          handleSelectMovie(result);
        }}
      />
    ));
  };

  const renderMovieDetail = () => {
    return (
      selectedMovie.info?.id && (
        <div className={styles.detail}>
          <MovieDetail movie={selectedMovie} />
        </div>
      )
    );
  };

  return (
    <div className={styles["result-list"]}>
      <h2>Search Result</h2>
      <div className={styles.results}>{renderResults()}</div>
      {renderMovieDetail()}
    </div>
  );
}

export default memo(ResultList);
