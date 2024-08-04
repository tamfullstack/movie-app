import React, { memo, useEffect, useState } from "react";
import imageUrl from "../../utils/imageUrl";
import styles from "./Banner.module.css";
import requestApi from "../../utils/requestApi";
import requests from "../../utils/requests";

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(requestApi(requests.fetchNetflixOriginals));
        const data = await res.json();

        if (res.status === 200) {
          setMovie(
            data.results[Math.floor(Math.random() * data.results.length - 1)]
          );
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, []);

  const renderDescription = (description, limit) => {
    const descriptionLimit =
      description?.length > limit
        ? description?.substr(0, limit - 1) + "..."
        : description;

    return <p>{descriptionLimit}</p>;
  };

  return (
    <div
      style={{ backgroundImage: `url(${imageUrl(movie?.backdrop_path)})` }}
      className={styles.banner}
    >
      <div className={styles.content}>
        <h1>
          {movie?.title ||
            movie?.name ||
            movie?.original_title ||
            movie?.original_name}
        </h1>
        <div className={styles.buttons}>
          <button className={styles.button}>Play</button>
          <button className={styles.button}>My List</button>
        </div>
        <div className={styles.description}>
          {renderDescription(movie?.overview, 150)}
        </div>
      </div>
    </div>
  );
}

export default memo(Banner);
