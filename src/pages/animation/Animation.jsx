import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Animation.scss";
import MainTitle from "../../components/MainTitle/MainTitle";
import Pagination from "../../components/pagination/Pagination";
import API from "../../config/api";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Animation = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAnimationSeries = async () => {
    const results = await API.getGenre(16, page);
    if (results) {
      setMovie(results);
    }
  };

  useEffect(() => {
    getAnimationSeries();
  }, [page]);

  return (
    <>
      <Navbar activeAnimation={"active"} />
      {movie.length === 0 && <Loading />}
      {loading && <Loading />}
      <div className="animation">
        <div className="animation-content">
          <MainTitle>Animation</MainTitle>
          <div className="animation-list">
            {movie.map((el) => (
              <Link
                to={"/detail/AllMovies"}
                onClick={() => localStorage.setItem("MovieID", el.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                  alt=""
                  key={el.id}
                />
              </Link>
            ))}
          </div>
        </div>
        <Pagination page={page} setPage={setPage} setLoading={setLoading} />
        <Footer />
      </div>
    </>
  );
};

export default Animation;
