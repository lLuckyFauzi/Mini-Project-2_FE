import React, { useState } from "react";
import "./Signup.scss";
import FirstTitle from "../../components/loginSignUpComponents/firstTitle/FirstTitle";
import SecondTitle from "../../components/loginSignUpComponents/secondTitle/SecondTitle";
import Label from "../../components/label/Label";
import SubmitButton from "../../components/submitButton/SubmitButton";
import Input from "../../components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../../config/api";
import { toast } from "react-toastify";
import TextFallback from "../../components/TextFallback/TextFallback";

const Signup = () => {
  const [passInput, setPassInput] = useState("");
  const [conPassInput, setConPassInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    if (passInput !== conPassInput) {
      setIsValid(true);
    } else {
      const result = await API.signUp(data);
      console.log(result);
      navigate("/login");
      toast.success("Daftar Berhasil!");
    }
  };
  return (
    <div className="signup">
      <div className="side-image"></div>
      <div className="signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FirstTitle>Neetflix Review</FirstTitle>
          <SecondTitle>Sign up</SecondTitle>
          <div className="signup-input">
            <Label>Full name</Label>
            <Input
              inputClassName={"signupLogin"}
              type="text"
              placeholder={"Full name"}
              register={register("fullname", {
                required: true,
              })}
              names="fullname"
            />
            {errors.fullname && errors.fullname.type === "required" && (
              <TextFallback>⚠️ Fullname Tidak Boleh Kosong</TextFallback>
            )}
            <Label>Email</Label>
            <Input
              inputClassName={"signupLogin"}
              type="text"
              placeholder={"Email"}
              register={register("email", {
                required: true,
              })}
              names="email"
            />
            {errors.email && errors.email.type === "required" && (
              <TextFallback>⚠️ Email Tidak Boleh Kosong</TextFallback>
            )}
            <Label>Password</Label>
            <Input
              inputClassName={"signupLogin"}
              type="password"
              placeholder={"Password"}
              register={register("password", {
                required: true,
                onChange: (e) => setPassInput(e.target.value),
              })}
              names="password"
            />
            {errors.password && errors.password.type === "required" && (
              <TextFallback>⚠️ Password Tidak Boleh Kosong</TextFallback>
            )}
            <Label>Confirm Password</Label>
            <Input
              inputClassName={"signupLogin"}
              type="password"
              placeholder={"Confirm Password"}
              register={register("conPassword", {
                required: true,
                onChange: (e) => setConPassInput(e.target.value),
              })}
              names="conPassword"
            />
            {isValid && <TextFallback>⚠️Password Tidak Sama</TextFallback>}
            <SubmitButton type="submit">Sign Me Up</SubmitButton>
            <Link style={{ textDecoration: "none" }} to="/login">
              <p>Already have an account?</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
