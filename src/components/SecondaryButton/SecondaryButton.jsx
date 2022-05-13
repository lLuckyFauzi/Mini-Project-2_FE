import React from "react";
import "./SecondaryButton.scss";

const SecondaryButton = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children || "Button"}
    </button>
  );
};

export default SecondaryButton;
