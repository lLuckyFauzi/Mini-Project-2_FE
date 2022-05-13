import React from "react";
import "./TextFallback.scss";

const TextFallback = (props) => {
  return (
    <p className={props.className || "text-fallback"}>
      {props.children || "Fallback Error!"}
    </p>
  );
};

export default TextFallback;
