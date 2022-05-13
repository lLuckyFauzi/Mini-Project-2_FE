import React, { useEffect, useState } from "react";
import "./Reviewed.scss";
import Navbar from "../../components/navbar/Navbar";
import MyListFilm from "../../components/myListFilm/MyListFilm";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer";
import MainTitle from "../../components/MainTitle/MainTitle";
import API from "../../config/api";
import jwt from "jwt-decode";
import Fallback from "../../components/Fallback/Fallback";
import Login from "../../assets/login.png";

const MyList = () => {
  const [dataReviewed, setDataReviewed] = useState([]);
  const [currentPages, setCurrentPages] = useState(1);
  const [itemPerPages, setItemPerPages] = useState(5);
  const [isLogIn, setIsLogIn] = useState(true);
  const userId = localStorage.getItem("token");

  const indexLastPost = currentPages * itemPerPages;
  const indexFirstPost = indexLastPost - itemPerPages;
  const currentPost = dataReviewed.slice(indexFirstPost, indexLastPost);

  const getAllReviewed = async () => {
    const decode = jwt(userId);
    const results = await API.getOneUser(decode.id);
    if (results) {
      setDataReviewed(results.data.revieweds);
    }
  };

  useEffect(() => {
    if (!userId) {
      setIsLogIn(false);
    }

    getAllReviewed();
  }, [currentPages]);

  return (
    <>
      <Navbar activeReviewed={"active"} />
      <div className="reviewed">
        <div className="reviewed-content">
          <MainTitle>Reviewed</MainTitle>
          <div className="reviewed-data">
            {dataReviewed.length === 0 && (
              <Fallback
                noImage={
                  !isLogIn ? (
                    <img src={Login} width={"350px"} height={"350px"} />
                  ) : (
                    ""
                  )
                }
              >
                {!isLogIn ? "Login Or Signup First" : "No Reviewed Yet."}
              </Fallback>
            )}
            {currentPost.map((el) => {
              return (
                <MyListFilm
                  key={el.id}
                  image={el.image}
                  title={el.title}
                  year={el.year}
                  duration={el.duration}
                  genre={el.genre}
                  casting={el.casting}
                  description={el.description}
                  rating={el.rating}
                  disabledDelete={"disabledDelete"}
                />
              );
            })}
          </div>
        </div>
        {dataReviewed.length > 5 && (
          <Pagination page={currentPages} setPage={setCurrentPages} />
        )}
        <Footer />
      </div>
    </>
  );
};

export default MyList;
