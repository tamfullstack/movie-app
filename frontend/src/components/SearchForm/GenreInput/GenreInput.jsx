import React, { useEffect, useState } from "react";
import { API_URL } from "../../../utils/constants";

export default function GenreInput(props) {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const res = await fetch(API_URL + "/genres");
        const data = await res.json();

        if (res.status === 200) {
          setGenreList(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenreList();
  });

  const handleChangeGenre = (e) => {
    props.onSelectGenre(e.target.value);
  };

  const renderGenreOptions = () => {
    return genreList.map((genre) => {
      return (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      );
    });
  };

  return (
    <select value={props.genre} onChange={handleChangeGenre}>
      <option value="">Genre</option>
      {renderGenreOptions()}
    </select>
  );
}
