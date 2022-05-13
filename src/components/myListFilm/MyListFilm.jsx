import React, { useState } from "react";
import DeleteList from "../deleteList/DeleteList";
import Rating from "../Rating/Rating";
import "./MyListFilm.scss";
import API from "../../config/api";
import Loading from "../Loading/Loading";
import Jwt from "jwt-decode";

const MyListFilm = ({
  image,
  title,
  year,
  duration,
  genre,
  casting,
  description,
  rating,
  movieId,
  disabledDelete,
}) => {
  const userId = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const deleteListHandler = async (e) => {
    const decode = Jwt(userId);
    e.preventDefault();
    setLoading(true);
    const result = await API.removeList(decode.id, movieId).then(() => {
      window.location.reload();
    });
    if (result) {
      console.log("Deleted!");
    }
  };

  return (
    <div className="mylist-list">
      {loading && <Loading />}
      <div className="mylist-img">
        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt="" />
      </div>
      <div className="mylist-detail">
        <div className="mylist-info">
          <h2>{title}</h2>
          <ul>
            <li>{year}</li>
            <li>|</li>
            <li>{duration + " minutes"}</li>
            <li>Genre : {genre}</li>
            <li>Staring : {casting}</li>
          </ul>
          <p>{description}</p>
          <div className="mylist-rating">
            <Rating rating={rating} />
            <form>
              <DeleteList
                disabled={disabledDelete}
                onClick={deleteListHandler}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListFilm;
