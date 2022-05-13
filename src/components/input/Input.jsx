import React from "react";
import "./Input.scss";

const Input = (props) => {
  const {
    inputClassName,
    type,
    placeholder,
    register,
    value,
    className,
    onChange,
    checked,
    id,
  } = props;
  return (
    <div className={inputClassName}>
      <input
        {...register}
        type={type}
        value={value}
        placeholder={placeholder}
        className={className || "input"}
        // onChange={onChange}
        checked={checked}
        id={id}
        name={props.names}
      />
    </div>
  );
};

export default Input;
