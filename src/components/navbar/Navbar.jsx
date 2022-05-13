import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import classNames from "classnames";
import NavbarDropDown from "./NavbarDropDown";
import decode from "jwt-decode";
import API from "../../config/api";
import { useForm } from "react-hook-form";

const Navbar = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [dataUser, setDataUser] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchResults, setSearchResults] = useState(false);
  const [searchNoData, setSearchNoData] = useState(false);
  const [searchClass, setSearchClass] = useState("");

  const { handleSubmit, register } = useForm();

  const token = localStorage.getItem("token");
  useEffect(async () => {
    if (token) {
      setIsLogin(true);
      const dataToken = decode(token);
      const result = await API.getOneUser(dataToken.id);
      if (result) {
        setDataUser(result.data);
      }
    } else {
      setIsLogin(false);
    }
  }, []);

  const searchOnChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.length > 0) {
      getBySearching();
      setSearchResults(true);
      if (searchData.length > 0) {
        setSearchNoData(true);
      } else {
        setSearchNoData(false);
      }
      if (searchData.length > 7) {
        setSearchClass("scroll-y");
      } else {
        setSearchClass("");
      }
    } else {
      setSearchResults(false);
    }
  }, [search]);

  const getBySearching = async () => {
    const results = await API.getBySearch(search);
    if (results) {
      setSearchData(results.data);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-menu">
        <h1 className="logo">Neetflix Review</h1>
        <ul>
          <Link className={classNames("Link", props.activeHome)} to="/">
            <li>Home</li>
          </Link>
          <Link
            className={classNames("Link", props.activeTvSeries)}
            to="/tvseries"
          >
            <li>Tv Series</li>
          </Link>

          <Link
            className={classNames("Link", props.activeAnimation)}
            to="/animation"
          >
            <li>Animation</li>
          </Link>
          <Link className={classNames("Link", props.activeMyList)} to="/mylist">
            <li>My List</li>
          </Link>
          <Link
            className={classNames("Link", props.activeReviewed)}
            to="/reviewed"
          >
            <li>Reviewed</li>
          </Link>
        </ul>
      </div>
      <div className="navbar-search">
        <div className="inputWrapper">
          <input
            className={"inputNavbar"}
            type="text"
            placeholder="Search"
            onChange={searchOnChange}
          />
          <BiSearch className="search-icon" />
        </div>
        {searchResults && (
          <div className="search-list">
            <div className={classNames("results", searchClass)}>
              {!searchNoData ? (
                <p style={{ textAlign: "center" }}>Not Found!</p>
              ) : (
                searchData.map((el) => {
                  return (
                    <Link
                      key={el.id}
                      to={`/detail/AllMovies`}
                      className={"item"}
                      onClick={() => {
                        localStorage.setItem("MovieID", el.id);
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                        width={"90px"}
                        alt=""
                      />
                      <p>
                        {el.original_title} <br /> {el.release_date}
                      </p>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        )}

        {isLogin ? (
          <NavbarDropDown
            className={props.className}
            fullname={dataUser.fullName}
          />
        ) : (
          <ul>
            <Link className="loginSignupNav" to="/signup">
              <li>Sign Up</li>
            </Link>
            <Link className="loginSignupNav" to="/login">
              <li>Login</li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
