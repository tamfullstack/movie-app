import React from "react";
import styles from "./SearchForm.module.css";
import { useState } from "react";
import GenreInput from "./GenreInput/GenreInput";
import MediaTypeInput from "./MediaTypeInput/MediaTypeInput";

export default function SearchForm(props) {
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  const handleSelectGenre = (selectedGenre) => {
    setGenre(selectedGenre);
  };

  const handleSelectMediaType = (selectedMediaType) => {
    setMediaType(selectedMediaType);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = {
      keyword,
      genre,
      mediaType,
      language,
      year,
    };
    props.onFetchSearch(query);
  };

  const handleReset = (e) => {
    e.preventDefault();
    props.onResetMovies();
    setKeyword("");
    setGenre("");
    setMediaType("");
    setLanguage("");
    setYear("");
  };

  return (
    <div className={styles["search-form"]}>
      <form onSubmit={handleSearch}>
        <div className={styles["search-input"]}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Search Movie"
              onChange={handleChangeKeyword}
              value={keyword}
            />
          </div>
          <div className={styles.icon}>
            <svg
              className="svg-inline--fa fa-search fa-w-16"
              fill="#ccc"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </div>
        </div>
        <div className={styles["search-sub-inputs"]}>
          <GenreInput genre={genre} onSelectGenre={handleSelectGenre} />
          <MediaTypeInput
            mediaType={mediaType}
            onSelectMediaType={handleSelectMediaType}
          />
          <select value={language} onChange={handleChangeLanguage}>
            <option value="">Language</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={handleChangeYear}
          />
        </div>
        <div className={styles["search-buttons"]}>
          <button
            className={styles["reset-button"]}
            type="reset"
            onClick={handleReset}
          >
            RESET
          </button>
          <button className={styles["search-button"]} type="submit">
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
}
