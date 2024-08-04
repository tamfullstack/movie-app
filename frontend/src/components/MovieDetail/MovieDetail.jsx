import React, { memo } from "react";
import styles from "./MovieDetail.module.css";
import YouTube from "react-youtube";
import imageUrl from "../../utils/imageUrl";

function MovieDetail(props) {
  const { movie } = props;
  const { info, trailer } = movie;

  const movieName = info?.title || info?.name || info?.original_name;

  const renderTrailer = () => {
    const opts = {
      height: "400",
      width: "100%",
      playerVars: {
        autoplay: 0,
      },
    };

    // Nếu có Trailer hoặc Teaser thì trả kết quả, không thì trả về Backdrop
    if (trailer) {
      return <YouTube opts={opts} videoId={trailer.key} />;
    } else {
      return <img src={imageUrl(info?.backdrop_path)} alt={movieName} />;
    }
  };

  return (
    <div className={styles["detail-row"]}>
      {/* Thông tin phim */}
      <div className={styles.info}>
        <h1 className={styles.title}>{movieName}</h1>
        <p>
          <b>
            Release Date: {info?.release_date || info?.first_air_date}
            <br />
            Vote: {info?.vote_average} / 10
          </b>
        </p>
        <p>{info?.overview}</p>
      </div>

      {/* Trailer */}
      <div className={styles.trailer}>{renderTrailer()}</div>
    </div>
  );
}

export default memo(MovieDetail);
