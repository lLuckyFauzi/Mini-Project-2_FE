import React from "react";
import "./SubmitButton.scss";

const SubmitButton = (props) => {
  return (
    <div className={props.className || "submit-button"} onClick={props.onClick}>
      <button type={props.type}>{props.children}</button>
    </div>
  );
};

export default SubmitButton;
