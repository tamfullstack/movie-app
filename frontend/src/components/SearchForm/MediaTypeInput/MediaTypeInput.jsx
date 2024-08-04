import React, { useEffect, useState } from "react";
import { API_URL } from "../../../utils/constants";

export default function MediaTypeInput(props) {
  const [mediaTypes, setMediaTypes] = useState([]);

  useEffect(() => {
    const fetchMediaTypes = async () => {
      try {
        const res = await fetch(API_URL + "/media-types");
        const data = await res.json();

        if (res.status === 200) {
          setMediaTypes(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMediaTypes();
  });

  const handleChangeMediaType = (e) => {
    e.preventDefault();
    props.onSelectMediaType(e.target.value);
  };

  const renderMediaTypeOptions = () => {
    return mediaTypes.map((mediaType, index) => {
      return (
        <option value={mediaType} key={index}>
          {mediaType}
        </option>
      );
    });
  };

  return (
    <select value={props.mediaType} onChange={handleChangeMediaType}>
      <option value="">Media Type</option>
      {renderMediaTypeOptions()}
    </select>
  );
}
