import React from "react";
import "./SkeletonContent.scss";
import SkeletonElement from "./SkeletonElement";

const SkeletonContent = () => {
  return (
    <div className="skeleton-content">
      <div className="skeleton-list">
        <SkeletonElement type={"button"} />
        <SkeletonElement type={"button2"} />
      </div>
      <div className="list">
        {[1, 2, 3, 4].map((n) => (
          <div key={n}>
            <SkeletonElement type={"movie"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonContent;
