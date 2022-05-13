import "./Profil.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import API from "../../config/api";
import jwt from "jwt-decode";
import PhotoProfil from "../../components/profilComponents/photoProfil/PhotoProfil";
import EditProfil from "../../components/profilComponents/editProfil/EditProfil";

const Profil = () => {
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [saveImage, setSaveimage] = useState("");
  const token = localStorage.getItem("token");
  const decode = jwt(token);

  console.log(image);

  const saveImagesInput = async () => {
    const results = await API.updateProfile(saveImage, decode.id);
    if (results) {
      console.log(results);
    }
  };

  const getOneUser = async () => {
    const results = await API.getOneUser(decode.id);
    if (results) {
      setSaveimage(`http://localhost:3001/image${results.data.image}`);
      setImage(`http://localhost:3001/image${results.data.image}`);
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);

  const inputFileHandler = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveimage(uploaded);
  };

  return (
    <>
      <Navbar className={"profilActive"} />
      <div className="profil">
        <div className="profil-background">
          <img src="https://i.ibb.co/RhNSKbM/profilbg.png" alt="" />
        </div>

        <div className="profil-box">
          <div className="profil-info">
            <h1>
              <span>|</span> Akun saya
            </h1>
            <div className="update-profil">
              <PhotoProfil image={image} inputFileHandler={inputFileHandler} />
              <EditProfil saveImage={saveImagesInput} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profil;
