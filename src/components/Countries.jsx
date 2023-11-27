import React, { useState } from "react";
import Country from "./Country";

export default function Countries({ countries }) {
  const [showCountry, setShowCountry] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalClick = (event) => {
    if (event.target.className === "country-info-modal") {
      setShowModal(false);
    }
  };

  return (
    <article className="country">
      <img
        onClick={() => {
          // setShowCountry(!showCountry);
          setShowModal(!showModal);
        }}
        className="countryflag"
        src={countries.flags.svg}
        alt={countries.flags.alt}
      />
      <div
        className="country-info-modal"
        style={{ display: showModal ? "block" : "none" }}
        onClick={handleModalClick}
      >
        <span className="close" onClick={() => setShowModal(false)}>
          &times;
        </span>

        {<Country country={countries} />}
      </div>
    </article>
  );
}
