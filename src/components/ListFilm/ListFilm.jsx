import React, { useEffect, useState } from "react";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import "./ListFilm.scss";
import { HiOutlineArrowRight } from "react-icons/hi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Star from "../Star/Star";
import API from "../../config/api";
import SkeletonContent from "../Skeleton/HomePage/SkeletonContent";

const ListFilm = (props) => {
  const { genreIds, category } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const results = await API.getGenre(genreIds, 1);
    setMovies(
      results
        // .filter((el) => el.genre_ids.includes(parseInt(genreIds)))
        .slice(0, 8)
    );
    setFiltered(results.results);
  };

  return (
    <>
      {movies.length === 0 ? (
        <SkeletonContent />
      ) : (
        <div className="list-film">
          <p className="title">{category || "Category"}</p>
          <Link to={`category/${category}`}>
            <SecondaryButton
              className="list-film-button"
              onClick={() => localStorage.setItem("Movies", genreIds)}
            >
              See More <HiOutlineArrowRight className="right-icons" />
            </SecondaryButton>
          </Link>
          <div className="list-film-carousel">
            <AiOutlineLeft className="left-icon" />
            <AiOutlineRight className="right-icon" />
            <div className="inner-carousel">
              <Slider {...settings}>
                {movies.map((item) => {
                  return (
                    <div className="item" key={item.id}>
                      <Link
                        to={"detail/AllMovies"}
                        onClick={() => localStorage.setItem("MovieID", item.id)}
                      >
                        <div className={"info-item"}>
                          <div className="item-title">
                            <p>
                              {item.original_title +
                                " " +
                                "(" +
                                item.release_date.slice(0, 4) +
                                ")" || "Spiderman No Way Home (2022)"}
                            </p>
                            <Star star={item.vote_average} />
                          </div>
                        </div>
                      </Link>
                      <img
                        className="img"
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt=""
                        width={"250px"}
                        height={"330px"}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListFilm;
