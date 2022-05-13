import React, { useEffect, useState } from "react";
import "./detail.scss";
import { MdSlowMotionVideo } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import Writing from "../../assets/writing.png";
import ComFallback from "../../assets/Comment-Fallback.png";
import Casting from "../..//components/components-detail/Casting";
import Comment from "../../components/components-detail/Comment";
import TextEditor from "../../components/components-detail/TextEditor";
import Button from "../../components/components-detail/Button";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/Loading/Loading";
import NoVideo from "../../assets/nodatavideo.png";
import API from "../../config/api";
import jwt from "jwt-decode";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Input from "../../components/input/Input";
import Fallback from "../../components/Fallback/Fallback";
import Star from "../../components/Star/Star";
import StarRatings from "react-star-ratings/build/star-ratings";
import { useForm } from "react-hook-form";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { toast } from "react-toastify";

const Detail = () => {
  const { allmovie } = useParams();
  const { register } = useForm();

  //Data Movie
  const [movie, setMovie] = useState([]);
  const [casting, setCasting] = useState([]);
  const [genre, setGenre] = useState([]);
  const [year, setYear] = useState("");
  const [movieVideo, setMovieVideo] = useState([]);

  //Data TvSeries
  const [Tvseries, setTvseries] = useState([]);
  const [tvSeriesVideo, setTvSeriesVideo] = useState([]);
  const [TvGenre, setTvGenre] = useState([]);
  const [TvCasting, setTvCasting] = useState([]);
  const [TvRuntime, setTvRuntime] = useState([]);

  //Data Comment
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState([]);

  //Data User
  const [userData, setUserData] = useState([]);

  //Helper
  const [isCheck, setIsCheck] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [lengthComment, setLengthComment] = useState(3);
  const [loading, setLoading] = useState(false);
  const hour = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  const movieID = localStorage.getItem("MovieID");
  const userId = localStorage.getItem("token");

  const TvId = localStorage.getItem("TvID");

  useEffect(() => {
    if (allmovie === "AllMovies") {
      getMovieVideo();
    } else {
      getTvSeriesVideo(TvId);
    }

    if (!userId) {
      setIsLogIn(false);
    }

    if (allmovie === "AllMovies") {
      getAllComment(movieID);
    } else {
      getAllComment(TvId);
    }

    getCasting(movieID);
    getTvCasting();
    getMovie();

    if (isLogIn === true) {
      getOneUser();
      checkHandler();
    }
  }, [loadMore, lengthComment, isCheck]);

  const getOneUser = async () => {
    const decode = jwt(userId);
    const results = await API.getOneUser(decode.id);
    if (results) {
      setUserData(results.data);
    }
  };

  const getMovie = async () => {
    if (allmovie === "TvSeries") {
      const TvData = await API.getOneTvSeries(TvId);
      setTvseries(TvData.data);
      setTvGenre(TvData.data.genres[0]);
      setTvRuntime(TvData.data.episode_run_time);
      setYear(TvData.data.last_air_date.slice(0, 4));
    } else if (allmovie === "AllMovies") {
      const results = await API.getOneMovie(movieID);
      setMovie(results);
      setGenre(results.genres[0]);
      setYear(results.release_date.slice(0, 4));
    }
  };

  const getMovieVideo = async () => {
    const results = await API.getMovieVideo(movieID);
    if (results) {
      setMovieVideo(
        results.data.results.filter((el) => el.official === true).slice(-3)
      );
    }
  };

  const getTvSeriesVideo = async (TvId) => {
    const results = await API.getTvSeriesVideo(TvId);
    if (results) {
      setTvSeriesVideo(results.data.results);
    }
  };

  const getCasting = async (movieID) => {
    const results = await API.getCasting(movieID);
    if (results) {
      setCasting(results.data.cast.slice(0, 9));
    }
  };

  const getTvCasting = async () => {
    const results = await API.getTvSeriesCasting(TvId);
    if (results) {
      setTvCasting(results.data.cast.slice(0, 9));
    }
  };

  const getAllComment = async (movieID) => {
    const results = await API.getAllComment();
    if (results) {
      setComment(results.data.filter((el) => el.movieId === parseInt(movieID)));
    }
  };

  const checkHandler = async () => {
    const decode = jwt(userId);
    if (allmovie === "AllMovies") {
      const results = await API.getOneMyList(decode.id, movieID);
      if (results.data.userId !== decode.id) {
        setIsCheck(false);
      } else {
        setIsCheck(results.data.isMylist);
      }
    } else {
      const results = await API.getOneMyList(decode.id, TvId);
      if (!results) {
        setIsCheck(false);
      } else if (results.data.userId !== decode.id) {
        setIsCheck(false);
      } else {
        setIsCheck(results.data.isMylist);
      }
    }
  };

  const loadMoreHandler = () => {
    if (loadMore === false) {
      setLoadMore(true);
      setLengthComment(99999);
    } else {
      setLoadMore(false);
      setLengthComment(3);
    }
  };

  const onSubmitToMyList = async (e) => {
    const decode = jwt(userId);

    e.preventDefault();
    if (isCheck === false) {
      if (allmovie === "AllMovies") {
        const results = await API.addMylist({
          userId: decode.id,
          movieId: movie.id,
          title: movie.title,
          image: movie.backdrop_path,
          year: year,
          duration: hour + " Hours " + minutes + " Minutes",
          genre: genre.name,
          casting: casting
            .slice(0, 3)
            .map((el) => el.name)
            .join(", "),
          description: movie.overview,
          rating: movie.vote_average,
          isMylist: true,
        });
        if (results) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          const getOneList = await API.getOneMyList(decode.id, movieID);
          if (getOneList) {
            setIsCheck(getOneList.data.isMylist);
            toast.success("Succesfully Add To My List");
          }
        }
      } else if (allmovie === "TvSeries") {
        const TvSeriesList = await API.addMylist(
          {
            userId: decode.id,
            movieId: Tvseries.id,
            title: Tvseries.name,
            image: Tvseries.backdrop_path,
            year: Tvseries.first_air_date,
            duration: TvRuntime.join(", "),
            genre: TvGenre.name,
            casting: TvCasting.slice(0, 3)
              .map((el) => el.name)
              .toString(),
            description: Tvseries.overview,
            rating: Tvseries.vote_average,
            isMylist: true,
          },
          decode.id
        );
        if (TvSeriesList) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          const getOneList = await API.getOneMyList(decode.id, TvId);
          if (getOneList) {
            setIsCheck(getOneList.data.isMylist);
            toast.success("Succesfully Add To My List");
          }
        }
      }
    }
  };

  const removeListHandler = async () => {
    const decode = jwt(userId);

    if (isCheck === true) {
      if (allmovie === "AllMovies") {
        const result = await API.removeList(decode.id, movieID);
        if (result) {
          setIsCheck(false);
          toast.success("Succesfully Delete From My List");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } else {
        const TvListDelete = await API.removeList(TvId).then(() =>
          window.location.reload()
        );
        if (TvListDelete) {
          console.log("deleted");
        }
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Navbar />
      {allmovie === "AllMovies" && movie.length === 0 && <Loading />}
      {allmovie === "TvSeries" && Tvseries.length === 0 && <Loading />}
      <div className="container-detail">
        <div className="bg-img">
          <img
            src={
              allmovie === "AllMovies"
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : `https://image.tmdb.org/t/p/w500${Tvseries.backdrop_path}`
            }
            className="img"
          />
          <div className="overlay"></div>
        </div>

        {/*start Profil film */}
        <div className="detail-profil">
          <div className="detail-img">
            <img
              src={
                allmovie === "AllMovies"
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `https://image.tmdb.org/t/p/w500${Tvseries.poster_path}`
              }
              alt="img"
              className="img"
            />
          </div>
          <div className="detail-judul">
            <h1>
              {allmovie === "AllMovies" ? movie.original_title : Tvseries.name}
            </h1>
            <p>
              {allmovie === "AllMovies" ? year : year} |{" "}
              {allmovie === "AllMovies"
                ? hour + " Hours " + minutes
                : TvRuntime.join(", ")}{" "}
              {allmovie === "AllMovies" ? "Minutes" : "Minutes each Episodes"}
            </p>
            {allmovie === "TvSeries" && (
              <p>Episodes: {Tvseries.number_of_episodes + " Episodes"}</p>
            )}
            {allmovie === "TvSeries" && (
              <p>Seasons: {Tvseries.number_of_seasons + " Seasons"}</p>
            )}
            <p>
              Starting :{" "}
              {allmovie === "AllMovies"
                ? casting
                    .slice(0, 3)
                    .map((el) => el.name)
                    .join(", ")
                : TvCasting.slice(0, 3)
                    .map((el) => el.name)
                    .join(", ")}
            </p>
            <p>
              Genre : {allmovie === "AllMovies" ? genre.name : TvGenre.name}
            </p>
            <div className="action">
              <a
                className="toYt"
                href={`https://www.youtube.com/watch?v=${movieVideo
                  .map((el) => el.key)
                  .slice(-2)
                  .toString()}`}
              >
                <MdSlowMotionVideo className="icon" />
                WATCH TRAILER
              </a>
              {isLogIn && (
                <form onSubmit={onSubmitToMyList}>
                  <Button
                    classButton={isCheck === false ? "listBtn" : "active"}
                    onClick={removeListHandler}
                  >
                    {isCheck === false ? (
                      <BsBookmark className="icon" />
                    ) : (
                      <BsBookmarkFill className="iconActive" />
                    )}
                    {isCheck === true ? "ALREADY IN LIST" : "SAVE TO MY LIST"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
        {/*end Profil film */}

        <div className="content-detail">
          {/* Start description */}
          <div className="description">
            <div className="text-description">
              <h1>Description</h1>
              <p>
                {allmovie === "AllMovies" ? movie.overview : Tvseries.overview}
              </p>
            </div>

            <div className="rating-description">
              <p className="rating-text">Rating</p>
              <p className="rating-number">
                <AiFillStar className="icon" />
                {allmovie === "AllMovies"
                  ? movie.vote_average
                  : Tvseries.vote_average}{" "}
                / 10
              </p>
            </div>
          </div>
          {/* end description */}

          {/* start trailer */}
          <div className="videos-trailer">
            <h1>Videos & Trailer</h1>
            <div className="videos">
              {movieVideo.length === 0 && (
                <Fallback
                  noImage={
                    <img
                      width={"350px"}
                      height={"350px"}
                      src={NoVideo}
                      alt=""
                    />
                  }
                >
                  No Trailer in This Movie :(
                </Fallback>
              )}
              {allmovie === "AllMovies"
                ? movieVideo.map((el) => {
                    return (
                      <YouTube key={el.id} className="video" videoId={el.key} />
                    );
                  })
                : tvSeriesVideo.map((el) => {
                    return (
                      <YouTube key={el.id} className="video" videoId={el.key} />
                    );
                  })}
            </div>
          </div>
          {/* end trailer */}

          {/* start Casting */}
          <div className="detail-casting">
            <h1>Casting</h1>
            <div className="castings">
              {allmovie === "AllMovies"
                ? casting.map((el) => {
                    return (
                      <Casting
                        key={el.id}
                        profile={el.profile_path}
                        name={el.name}
                        character={el.character}
                      />
                    );
                  })
                : TvCasting.map((el) => {
                    return (
                      <Casting
                        key={el.id}
                        profile={el.poster_path}
                        name={el.name}
                        character={el.character}
                      />
                    );
                  })}
            </div>
          </div>
          {/* end Casting */}

          {/* start write and review */}
          {isLogIn === false ? (
            <div className="fallback-write">
              <img src={Writing} width={"280px"} height={"280px"} />
              <div className="content-fallback">
                <p>Signup Or Login To Comment</p>
                <div className="action-fallback">
                  <Link to={"/signup"}>
                    <SecondaryButton className="fallback-button">
                      Signup
                    </SecondaryButton>
                  </Link>
                  <Link to={"/login"}>
                    <SecondaryButton className="fallback-button">
                      Login
                    </SecondaryButton>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="container-write">
              <h1>Write Your Review</h1>
              <div className="write-rating">
                <h3>Rating</h3>
                <Star
                  star=" "
                  starInput={
                    <StarRatings
                      name="rating"
                      rating={rating}
                      starRatedColor="rgba(254, 206, 32, 1)"
                      starHoverColor={"rgba(254, 206, 32, 1)"}
                      numberOfStars={10}
                      changeRating={setRating}
                    />
                  }
                  rating={rating}
                  setRating={setRating}
                />
              </div>
              <div className="title-write">
                <label htmlFor="title">Title</label>
                <Input
                  className="input-title"
                  type="text"
                  id="title"
                  placeholder="Write your title"
                  register={register("title", {
                    required: true,
                    onChange: (e) => setTitle(e.target.value),
                  })}
                  names="title"
                />
              </div>
              <div className="write-review">
                <h3>Review</h3>
                <TextEditor
                  movieId={movieID}
                  title={title}
                  setComment={setComment}
                  data={userData}
                  rating={rating}
                  dataMovie={movie}
                  genre={genre}
                  casting={casting}
                  tvCasting={TvCasting}
                  image={userData.image}
                  year={year}
                  hour={hour}
                  minutes={minutes}
                />
              </div>
            </div>
          )}
          {/* end write and review */}
          {/* start comment */}
          <div className="detail-comment">
            {comment.length === 0 && (
              <Fallback
                className="fallback-com"
                noImage={
                  <img
                    src={ComFallback}
                    width={"250px"}
                    height={"250px"}
                    alt=""
                  />
                }
              >
                Be The First Comment!
              </Fallback>
            )}
            {comment
              .map((el) => {
                return <Comment key={el.id} data={el} />;
              })
              .slice(0, lengthComment)}
            {comment.length > 3 && (
              <Button
                label={loadMore ? "Load Less" : "Load More"}
                classButton={"primary"}
                onClick={loadMoreHandler}
              />
            )}
          </div>
          {/* end comment */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Detail;
