import React, { useState } from "react";
import "./scss/star.scss";
import { BsStar } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const Star = () => {
  const [starCeklis, setStarCeklis] = useState(false);
  const [checked, setChecked] = useState(false);
  const checkedHandler = () => {
    if (checked === false) {
      setChecked(true);
      setStarCeklis(true);
    } else {
      setChecked(false);
      setStarCeklis(false);
    }
  };
  return (
    <div className="star">
      <label htmlFor="star">
        {!starCeklis ? (
          <BsStar className="icon-star" />
        ) : (
          <AiFillStar className="icon-star-active" />
        )}
      </label>
      <input
        type="checkbox"
        id="star"
        checked={checked}
        onClick={checkedHandler}
      />
    </div>
  );
};

export default Star;
