import axios from "axios";
import { toast } from "react-toastify";

const url = axios.create({
  baseURL: "http://localhost:3001/",
});

export default {
  signUp: (data) => {
    return new Promise((resolve, reject) => {
      url
        .post(`sign_up`, {
          fullName: data.fullname,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          console.log(response);
          resolve(true);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  login: (data) => {
    return new Promise((resolve, reject) => {
      url
        .post(`login`, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          toast.success(response.data.message);
          if (response.data.msg) {
            toast.error(response.data.msg);
            resolve(false);
          } else {
            resolve(true);
          }
          localStorage.setItem("token", response.data.token);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  getOneUser: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_one_user/${id}`)
        .then((response) => {
          // console.log(response.data);
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  updateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      url
        .put(`update/${id}`, {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          toast.success(response.msg);
          resolve(true);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  // updatePass: (data, id) => {
  //   return new Promise((resolve, reject) => {
  //     url
  //       .put(`updatePass/${id}`, { password: data.password })
  //       .then(() => {
  //         resolve(true);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //         reject(false);
  //       });
  //   });
  // },

  updateProfile: (data, id) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", data);

      url
        .put(`upload/${id}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          resolve(true);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          reject(false);
        });
    });
  },

  //Movie
  getAllMovies: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_allMovies/${id}`)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  //Get By Search
  getBySearch: (query) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getBySearch/${query}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  //Get Movies Video
  getMovieVideo: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getMoviesVideo/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  //Get Genre By Id
  getGenre: (id, page) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_movies/${id}/${page}`)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  //Get Movie by Id
  getOneMovie: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_one_movie/${id}`)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  //getAllTvSeries
  getTvSeries: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_TvSeries/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  //getOneTvSeries
  getOneTvSeries: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getOne_TvSeries/${id}`)
        .then(() => {
          url.get(`getOne_TvSeries/${id}`).then((res) => {
            resolve(res.data);
          });
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  getTvSeriesVideo: (tvId) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getTvSeriesVideo/${tvId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  //getMovieCasting
  getCasting: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_casting/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  //getTvSeriesCasting
  getTvSeriesCasting: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getTvSeriesCasting/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  // MyList
  addMylist: (data) => {
    return new Promise((resolve, reject) => {
      url
        .post(`addMylist`, {
          userId: data.userId,
          movieId: data.movieId,
          title: data.title,
          image: data.image,
          year: data.year,
          duration: data.duration,
          genre: data.genre,
          casting: data.casting,
          description: data.description,
          rating: data.rating,
          isMylist: data.isMylist,
        })
        .then(() => {
          url
            .get(`getOneMyList/${data.userId}/${data.movieId}`)
            .then((response) => resolve(response.data));
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  getAllMyList: () => {
    return new Promise((resolve, reject) => {
      url
        .get(`getAllMyList`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  getOneMyList: (id, movieId) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getOneMylist/${id}/${movieId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  removeList: (id, movieId) => {
    return new Promise((resolve, reject) => {
      url
        .delete(`removeList/${id}/${movieId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  getAllComment: () => {
    return new Promise((resolve, reject) => {
      url
        .get("getAllComment")
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  createComment: (userId, movieId, data, profile, title, text, rate) => {
    new Promise((resolve, reject) => {
      url
        .post("createComment", {
          userId: userId,
          movieId: movieId,
          userName: data.fullName,
          // history: data.history,
          profile: profile,
          rate: rate,
          title: title,
          text: text,
        })
        .then(() => {
          url.get("getAllComment").then((response) => {
            resolve(response.data);
          });
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },
  createReview: (data) => {
    return new Promise((resolve, reject) => {
      url
        .post("createReview", {
          userId: data.userId,
          movieId: data.movieId,
          title: data.title,
          image: data.image,
          year: data.year,
          duration: data.duration,
          genre: data.genre,
          casting: data.casting,
          description: data.description,
          rating: data.rating,
          isReviewed: data.isReviewed,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  getAllReview: () => {
    return new Promise((resolve, reject) => {
      url
        .get("getReview")
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },

  getOneReview: (movieId, userId) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getOneReview/${movieId}/${userId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  },
};
