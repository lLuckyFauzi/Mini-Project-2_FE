import React from "react";
import "./Rating.scss";
import { AiFillStar } from "react-icons/ai";

const Rating = ({ rating }) => {
  return (
    <div className="rating">
      <h6>
        <span>
          <AiFillStar />
        </span>
        {rating} / 10
      </h6>
    </div>
  );
};

export default Rating;
