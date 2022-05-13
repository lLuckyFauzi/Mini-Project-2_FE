import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import "./DeleteList.scss";

const DeleteList = (props) => {
  return (
    <div className={"delete-list"}>
      <button onClick={props.onClick} disabled={props.disabled}>
        <HiOutlineTrash /> Hapus dari my list
      </button>
    </div>
  );
};

export default DeleteList;
