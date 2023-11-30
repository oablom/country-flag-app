import { useState, useEffect } from "react";
import Countries from "./Countries";
import LoadingSpinner from "./LoadingSpinner";
// import africa from "../images/map-of-africa.png";

export default function CountryFlagApp({ selectedRegion }) {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [showCountries, setShowCountries] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loadedCountries, setLoadedCountries] = useState(false);
  const [clickedButton, setClickedButton] = useState(false);

  // useEffect(() => {
  //   const selectedRegionChild = () => {
  //     if (region) {
  //       selectedRegion(region);
  //     }
  //   };

  //   selectedRegionChild();
  // }, [buttonClicked, region, selectedRegion]);

  async function fetchCountries(region) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await response.json();
      setCountries(data);
      setLoadedCountries(true);
    } catch (error) {
      console.error(error);
    }
  }
  const selectedRegionChild = () => {
    if (region) {
      selectedRegion(region);
    }
  };

  return (
    <div className="country-flag-app-container">
      <div className="select-region">
        <select
          onChange={(e) => {
            setRegion(e.target.value);
            setButtonClicked(false);
          }}
          name="select-country"
          id="select-country"
        >
          <option value="">Select a region</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
        </select>
        <button
          onClick={() => {
            region && fetchCountries(region);
            region && setButtonClicked(true);
            setButtonClicked(true);

            selectedRegionChild();
          }}
        >
          Show countries
        </button>
      </div>

      {loadedCountries ? (
        <div
          className="countries-container"
          style={{
            backgroundColor:
              buttonClicked && region ? "rgba(255, 255, 255, 0.757)" : "none",
          }}
        >
          {countries.map((country) => {
            return <Countries key={country.name.common} countries={country} />;
          })}
        </div>
      ) : (
        <div>
          {region != "" && buttonClicked && <LoadingSpinner type="images" />}
          {console.log("REGION(!!!):", region)}
        </div>
        //
      )}
    </div>
  );
}
