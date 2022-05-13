import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./Star.scss";

const Star = (props) => {
  const { starInput } = props;

  return (
    <p className="item-start">
      <div>{starInput || <AiFillStar className="star-icons" />}</div>{" "}
      {props.star || "0.0"}
    </p>
  );
};

export default Star;
