import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Banner from "../../components/Banner/Banner";
import MovieList from "../../components/MovieList/MovieList";

function Browse() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <MovieList type="fetchNetflixOriginals" original />
      <MovieList title="Xu hướng" type="fetchTrending" />
      <MovieList title="Xếp hạng cao" type="fetchTopRated" />
      <MovieList title="Hành động" type="fetchActionMovies" />
      <MovieList title="Hài" type="fetchComedyMovies" />
      <MovieList title="Kinh dị" type="fetchHorrorMovies" />
      <MovieList title="Lãng mạn" type="fetchRomanceMovies" />
      <MovieList title="Tài liệu" type="fetchDocumentaries" />
    </div>
  );
}

export default Browse;
