import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Category.scss";
import { AiOutlineRight } from "react-icons/ai";
import Pagination from "../../components/pagination/Pagination";
import API from "../../config/api";
import { useParams, Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Category = () => {
  const { category } = useParams();
  console.log(category);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getDataMovie = async () => {
    const id = localStorage.getItem("Movies");
    const result = await API.getGenre(id, page);
    setData(result.slice(0, 18));
  };

  useEffect(() => {
    getDataMovie();
  }, [page]);

  return (
    <div>
      <Navbar />
      {loading && <Loading />}
      {data.length === 0 && <Loading />}
      <div className="all-category-container">
        <div className="all-category-history">
          <p>Home</p>
          <p>
            <AiOutlineRight className="icon-right" />
            Category
          </p>
          <p>
            <AiOutlineRight className="icon-right" />
            {category || "Nama Kategori"}
          </p>
        </div>
        <div className="all-category">
          <p className="all-category-title">{category || "Category"}</p>
          <div className="all-category-film">
            {data.map((el) => {
              return (
                <Link
                  to={`/detail/AllMovies`}
                  key={el.id}
                  onClick={() => localStorage.setItem("MovieID", el.id)}
                >
                  <img
                    key={el.id}
                    src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                    alt=""
                    width={"170px"}
                    height={"250px"}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <Pagination setLoading={setLoading} page={page} setPage={setPage} />
      </div>
      <Footer />
    </div>
  );
};

export default Category;
