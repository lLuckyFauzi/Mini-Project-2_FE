import React from "react";
import { Triangle } from "react-loader-spinner";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="container">
        <Triangle ariaLabel="loading-indicator" color="red" />
      </div>
    </div>
  );
};

export default Loading;
