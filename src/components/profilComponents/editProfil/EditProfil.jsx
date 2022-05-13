import "./EditProfil.scss";
import React, { useState, useEffect } from "react";
import Label from "../../label/Label";
import Input from "../../input/Input";
import decode from "jwt-decode";
import SubmitButton from "../../submitButton/SubmitButton";
import API from "../../../config/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfil = (props) => {
  const { uploadImages, saveImage } = props;
  const { handleSubmit, register } = useForm();
  const [fullnameEdit, setFullnameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [passwordEdit, setPasswordEdit] = useState("");
  const [passwordCon, setPasswordCon] = useState("");
  const [isValid, setIsValid] = useState();
  const navigatePage = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(async () => {
    if (token) {
      const dataToken = decode(token);
      const result = await API.getOneUser(dataToken.id);
      if (result) {
        setFullnameEdit(result.data.fullName);
        setEmailEdit(result.data.email);
      }
    }
  }, []);

  const onSubmit = (data) => {
    saveImage();
    const dataToken = decode(token);
    if (passwordCon !== passwordEdit) {
      setIsValid(false);
    } else {
      const result = API.updateUser(data, dataToken.id);
      if (result) {
        navigatePage("/");
      }
    }
  };

  return (
    <div className="edit-profil">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-edit">
          <Label>Fullname</Label>
          <Input
            value={fullnameEdit}
            inputClassName={"profil-input"}
            type="text"
            names="fullName"
            placeholder={"Fullname"}
            register={register("fullName", {
              required: true,
              value: fullnameEdit,
              onChange: (e) => setFullnameEdit(e.target.value),
            })}
          />
          <Label>Email</Label>
          <Input
            value={emailEdit}
            inputClassName={"profil-input"}
            type="text"
            names="email"
            placeholder={"Email"}
            register={register("email", {
              required: true,
              value: emailEdit,
              onChange: (e) => setEmailEdit(e.target.value),
            })}
          />
          <Label>Password</Label>
          <Input
            value={passwordEdit}
            inputClassName={"profil-input"}
            type="password"
            names="password"
            id="password"
            placeholder={"Password"}
            register={register("password", {
              value: passwordEdit,
              onChange: (e) => setPasswordEdit(e.target.value),
            })}
          />
          <Label>Confirm password</Label>
          <input
            className={"pass-input"}
            type="password"
            names="confirmPass"
            placeholder={"Confirm password"}
            onChange={(e) => setPasswordCon(e.target.value)}
          />
          {isValid === false && (
            <p className="fallback-profile" style={{ color: "red" }}>
              ⚠️ Password Tidak Sama
            </p>
          )}
        </div>
        <div className="save-profil">
          <SubmitButton type="submit" onClick={uploadImages}>
            Simpan Profil
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default EditProfil;
