import React from "react";
import "./scss/button.scss";

const Button = ({ classButton, label, children, disabled, onClick }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={classButton}>
      {label || children}
    </button>
  );
};

export default Button;
