import { useState, useEffect, useRef } from "react";
import Countries from "./Countries";
import LoadingSpinner from "./LoadingSpinner";
// import africa from "../images/map-of-africa.png";

export default function CountryFlagApp({ selectedRegion }) {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loadedCountries, setLoadedCountries] = useState(false);
  const [countriesArray, setCountriesArray] = useState([]);
  const countriesContainerRef = useRef(null);

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

  const animationTimeout = () => {
    setTimeout(() => {
      countriesContainerRef.current.style.animation = "none";
    }, 3000);
  };

  useEffect(() => {
    if (countriesContainerRef.current) {
      countriesContainerRef.current.style.animation =
        "stretchout 3s ease-in-out";
      const clearAnimationTimeout = animationTimeout();
      clearTimeout(clearAnimationTimeout);
    }
  }, [buttonClicked]);

  // useEffect(() => {
  //   setCountriesArray([]);
  //   countries.map((country) => {
  //     setCountriesArray([
  //       ...countriesArray,
  //       <Countries key={country.name.common} countries={country} />,
  //     ]);
  //   });
  //   console.log(countriesArray);
  // }, [buttonClicked]);

  // useEffect(() => {
  //   for (let i = 1; i <= countries.length; i++) {
  //     const country = countries[i];
  //     console.log(i);
  //     setCountriesArray((prevState) => [
  //       ...prevState,
  //       <Countries key={country.name.common} countries={country} />,
  //     ]);

  //     setTimeout(
  //       () =>
  //         setCountriesArray((prevState) => [
  //           ...prevState,
  //           <Countries key={country.name.common} countries={country} />,
  //         ]),
  //       3000
  //     );
  //   }
  // }, []);

  // const countryComponents = [];

  // function test(countries) {
  //   for (let index = 0; index < countries.length; index++) {
  //     const country = countries[index];
  //     console.log(index);
  //     countryComponents.push(
  //       <Countries key={country.name.common} countries={country} />
  //     );
  //   }
  //   return countryComponents;
  // }

  return (
    <div className="country-flag-app-container">
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
        <button
          onClick={() => {
            countriesContainerRef.current &&
              (countriesContainerRef.current.style.animation = "none");
            region && fetchCountries(region);
            region && setButtonClicked(!buttonClicked);

            selectedRegionChild();
          }}
        >
          Show countries
        </button>
      </div>

      {loadedCountries ? (
        <div
          className="countries-container"
          ref={countriesContainerRef}
          style={{
            backgroundColor:
              buttonClicked && region ? "rgba(255, 255, 255, 0.6)" : "none",
          }}
        >
          {/* {test(countries)} */}

          {countries.map((country) => {
            return <Countries key={country.name.common} countries={country} />;
          })}
        </div>
      ) : (
        <div>
          {region != "" && buttonClicked && <LoadingSpinner type="images" />}
        </div>
        //
      )}
    </div>
  );
}
