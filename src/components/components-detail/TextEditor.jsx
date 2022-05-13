import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import Button from "./Button";
import API from "../../config/api";
import jwt from "jwt-decode";
import Loading from "../Loading/Loading";

const TextEditor = ({
  movieId,
  data,
  image,
  title,
  setComment,
  rating,
  dataMovie,
  genre,
  casting,
  year,
  hour,
  minutes,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isReviewed, setIsReviewed] = useState(false);
  const [loading, setLoading] = useState(false);

  const movieID = localStorage.getItem("MovieID");
  const idUser = localStorage.getItem("token");

  const getOneReview = async () => {
    const decode = jwt(idUser);

    const results = await API.getOneReview(movieID, decode.id);
    if (results) {
      setIsReviewed(results.data.isReviewed);
    }
  };

  const onEditorStateChange = (e) => {
    setEditorState(e);
    setText(draftToHtml(convertToRaw(e.getCurrentContent())));
    if (text.length === 0) {
      setIsDisabled(false);
    }
  };

  const onSubmit = async () => {
    const decode = jwt(idUser);

    const results = await API.createComment(
      decode.id,
      movieId,
      data,
      image,
      title,
      text,
      rating
    );
    if (results) {
      const getAllComment = await API.getAllComment();
      setComment(
        getAllComment.data.filter((el) => el.movieId === parseInt(movieId))
      );
    }

    if (isReviewed === false) {
      const resultsReview = await API.createReview({
        userId: decode.id,
        movieId: movieId,
        title: dataMovie.original_title,
        image: dataMovie.backdrop_path,
        year: year,
        duration: hour + " Hours " + minutes + " Minutes",
        genre: genre.name,
        casting: casting
          .slice(0, 3)
          .map((el) => el.name)
          .join(", "),
        description: dataMovie.overview,
        rating: dataMovie.vote_average,
        isReviewed: true,
      });
      if (resultsReview) {
        console.log(resultsReview);
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    getOneReview();
  }, []);

  return (
    <>
      <div className="text-editor">
        <form onSubmit={onSubmit}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassname="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
          <div className="button">
            <Button
              classButton={"secondary"}
              label="Submit"
              disabled={isDisabled}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default TextEditor;
