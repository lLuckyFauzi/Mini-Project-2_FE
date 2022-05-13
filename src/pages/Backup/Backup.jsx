import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Backup.scss";
import NotFound from "../../assets/NotFound.png";
import Footer from "../../components/footer/Footer";

const Backup = () => {
  return (
    <>
      <Navbar />
      <div className="backup-wrapper">
        <div className="backup">
          <img src={NotFound} alt="err" width={"500px"} height={"500px"} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Backup;
