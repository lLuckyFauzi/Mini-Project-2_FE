import React from "react";
import { Link } from "react-router-dom";
import Star from "../Star/Star";

const AiringMovie = (props) => {
  const { title, description, image, star, idMovie } = props;

  const truncate = (des, limit) => {
    if (des.length <= limit) {
      return des;
    }
    return des.slice(0, limit) + "...";
  };

  return (
    <div className="airing-box">
      <Link to={"detail/AllMovies"} style={{ textDecoration: "none" }}>
        <img
          className="airing-images"
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt=""
          width={"65px"}
          height={"86px"}
          onClick={() => localStorage.setItem("MovieID", idMovie)}
        />
      </Link>
      <div className="airing-text-container">
        <p className="airing-film-title">{title || "Movies Title"}</p>
        <p className="airing-text">
          {truncate(description, 80) || "Movies Description"}
        </p>
        <Star star={star} />
      </div>
    </div>
  );
};

export default AiringMovie;
