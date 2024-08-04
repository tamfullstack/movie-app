import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SearchForm from "../../components/SearchForm/SearchForm";
import requestApi from "../../utils/requestApi";
import requests from "../../utils/requests";
import ResultList from "../../components/ResultList/ResultList";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    info: undefined,
    trailer: undefined,
  });

  const handleFetchSearch = async (query) => {
    try {
      setSelectedMovie({
        info: undefined,
        trailer: undefined,
      });

      const res = await fetch(requestApi(requests.fetchSearch), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
      const data = await res.json();

      if (res.status === 200) {
        setMovies(data.results);
      } else {
        setMovies([]);
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetMovies = () => {
    setMovies([]);
    setSelectedMovie({
      info: undefined,
      trailer: undefined,
    });
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="app">
      <NavBar />
      <SearchForm
        onFetchSearch={handleFetchSearch}
        onResetMovies={handleResetMovies}
      />
      <ResultList
        movies={movies}
        selectedMovie={selectedMovie}
        onSelectMovie={handleSelectMovie}
      />
    </div>
  );
};

export default Search;
