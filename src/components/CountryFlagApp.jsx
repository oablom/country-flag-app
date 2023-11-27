import { useState, useEffect } from "react";
import Countries from "./Countries";
// import africa from "../images/map-of-africa.png";

export default function CountryFlagApp() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [showCountries, setShowCountries] = useState(false);

  // useEffect(() => {
  async function fetchCountries(region) {
    try {
      // if (!region) {
      //   console.log("no region");
      //   return;
      // }
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }
  // }, []);

  return (
    <div>
      <div className="select-region">
        <select
          onChange={(e) => {
            setRegion(e.target.value);
          }}
          name="select-country"
          id="select-country"
        >
          <option value="">Select a region</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
        </select>
        <button onClick={() => fetchCountries(region)}>Show countries</button>
      </div>

      <div className="countries-container">
        {countries.map((country) => {
          console.log(country);
          return <Countries key={country.name.common} countries={country} />;
        })}
      </div>
      {/* <img
        className="bg"
        src={require("../components/images/mapofasia.png")}
        alt=""
      /> */}
    </div>
  );
}
