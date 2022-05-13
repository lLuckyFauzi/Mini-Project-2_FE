import React, { useEffect, useState } from "react";
import "./MyList.scss";
import Navbar from "../../components/navbar/Navbar";
import MyListFilm from "../../components/myListFilm/MyListFilm";
import Footer from "../../components/footer/Footer";
import MainTitle from "../../components/MainTitle/MainTitle";
import Pagination from "../../components/pagination/Pagination";
import jwt from "jwt-decode";
import API from "../../config/api";
import Fallback from "../../components/Fallback/Fallback";
import Login from "../../assets/login.png";

const MyList = () => {
  const [list, setList] = useState([]);
  const [currentPages, setCurrentPages] = useState(1);
  const [itemPerPages, setItemPerPages] = useState(5);
  const [isLogIn, setIsLogIn] = useState(true);
  const token = localStorage.getItem("token");

  const indexLastPost = currentPages * itemPerPages;
  const indexFirstPost = indexLastPost - itemPerPages;
  const currentPost = list.slice(indexFirstPost, indexLastPost);

  const getMylist = async () => {
    const decode = jwt(token);
    const results = await API.getOneUser(decode.id);
    if (results) {
      setList(results.data.myLists);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLogIn(false);
    }

    getMylist();
  }, [currentPages]);

  return (
    <>
      <Navbar activeMyList={"active"} />
      <div className="mylist">
        <div className="mylist-content">
          <MainTitle>My List</MainTitle>
          <div className="my-list-data">
            {list.length === 0 && (
              <Fallback
                noImage={
                  !isLogIn ? (
                    <img src={Login} width={"350px"} height={"350px"} />
                  ) : (
                    ""
                  )
                }
              >
                {!isLogIn ? "Login Or Signup First" : "No Movie List"}
              </Fallback>
            )}
            {currentPost.map((el) => (
              <MyListFilm
                key={el.id}
                movieId={el.movieId}
                image={el.image}
                title={el.title}
                year={el.year}
                duration={el.duration}
                genre={el.genre}
                casting={el.casting}
                description={el.description}
                rating={el.rating}
              />
            ))}
          </div>
        </div>
        {list.length > 5 && (
          <Pagination
            page={currentPages}
            setPage={setCurrentPages}
            data={list.length}
          />
        )}
        <Footer />
      </div>
    </>
  );
};

export default MyList;
