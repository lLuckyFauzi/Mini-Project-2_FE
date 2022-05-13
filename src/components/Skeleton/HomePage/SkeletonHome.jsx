import React from "react";
import SkeletonElement from "./SkeletonElement";
import "../HomePage/SkeletonHome.scss";
import Shimmer from "./Shimmer";

const SkeletonHome = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-home">
        <div className="img-wrapper">
          <SkeletonElement type={"image"} />
          <Shimmer />
        </div>

        <div className="airing">
          <SkeletonElement type={"airing-title"} />
          <div className="airing-content">
            {[1, 2, 3, 4].map((n) => (
              <div className="box" key={n}>
                <SkeletonElement type={"airing-img"} />
                <Shimmer />
                <div className="airing-des">
                  {[1, 2, 3].map((n) => (
                    <div key={n}>
                      <SkeletonElement type={"airing-detail"} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonHome;
