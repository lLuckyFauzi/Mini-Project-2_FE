import React, { useEffect, useState } from "react";
import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
import AiringMovie from "../../components/AiringMovie/AiringMovie";
import ListFilm from "../../components/ListFilm/ListFilm";
import Footer from "../../components/footer/Footer";
import Slider from "react-slick";
import API from "../../config/api";
import SkeletonHome from "../../components/Skeleton/HomePage/SkeletonHome";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [airingMovies, setAiringMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAiringMovies = async () => {
    const results = await API.getAllMovies(1);
    setAiringMovies(
      results.results
        .filter((el) => {
          const rating = parseInt(el.vote_average);
          return rating > 6;
        })
        .slice(0, 4)
    );
    setLoading(false);
  };

  useEffect(() => {
    getAiringMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Navbar activeHome={"active"} />
      {loading && <Loading />}
      {loading ? (
        <>
          <SkeletonHome />
        </>
      ) : (
        <div className="wrapper">
          <div className="home-container">
            <div className="landingPages">
              <div className="scrolling-film-container">
                <Slider {...settings}>
                  {airingMovies.map((image) => (
                    <div key={image.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${image.backdrop_path}`}
                        alt=""
                        width={"720px"}
                        height={"460px"}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="airing-container">
                <p className="airing-title">Top Airing Movie</p>
                {airingMovies.map((el) => (
                  <div key={el.id}>
                    <AiringMovie
                      idMovie={el.id}
                      image={el.poster_path}
                      title={el.original_title}
                      description={el.overview}
                      star={el.vote_average}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <ListFilm genreIds={28} category="Action" />
              <ListFilm genreIds={10402} category="Music" />
              <ListFilm genreIds={35} category="Comedy" />
              <ListFilm genreIds={18} category="Drama" />
              <ListFilm genreIds={27} category="Horror" />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
