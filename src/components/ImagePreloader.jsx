// import React, { useState, useEffect } from "react";

export default function ImagePreloader({ loaded, src, selectedRegionStatus }) {
  return (
    <div className="image-preloader-container">
      {!loaded && (
        <div className={selectedRegionStatus}>Loading background images...</div>
      )}
      {loaded && (
        <div className={selectedRegionStatus}>
          <img
            style={{ display: loaded ? "block" : "none" }}
            src={src}
            alt="World map"
            className={selectedRegionStatus == "world" ? "bg-world" : "bg"}
          />
        </div>
      )}
    </div>
  );
}
