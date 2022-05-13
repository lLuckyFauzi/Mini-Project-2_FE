import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./TvSeries.scss";
import MainTitle from "../../components/MainTitle/MainTitle";
import Pagination from "../../components/pagination/Pagination";
import BackupImg from "../../assets/filmbackup.jpg";
import API from "../../config/api";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const TvSeries = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTvSeries = async () => {
    const results = await API.getTvSeries(page);
    if (results) {
      setMovie(results.data.results);
    }
  };

  useEffect(() => {
    getTvSeries();
  }, [page]);

  return (
    <>
      <Navbar activeTvSeries={"active"} />
      {movie.length === 0 && <Loading />}
      {loading && <Loading />}
      <div className="tv-series">
        <div className="tv-series-content">
          <MainTitle>Tv Series</MainTitle>
          <div className="tv-series-list">
            {movie.map((el) => {
              return (
                <Link
                  to={"/detail/TvSeries"}
                  key={el.id}
                  onClick={() => localStorage.setItem("TvID", el.id)}
                >
                  {!el.poster_path ? (
                    <img src={BackupImg} alt="" />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                      alt=""
                      key={el.id}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
        <Pagination setLoading={setLoading} page={page} setPage={setPage} />
        <Footer />
      </div>
    </>
  );
};

export default TvSeries;
