import { useState, useEffect, useRef } from "react";
import Countries from "./Countries";
import LoadingSpinner from "./LoadingSpinner";

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

  useEffect(() => {
    // setCountriesArray([]);

    let intervalId;
    let index = 0;

    const addCountryWithDelay = () => {
      if (index < countries.length) {
        //loopar med en ifstats istället för en forloop för att kunna använda setTimeout. Det buggade så mkt annars.
        setCountriesArray((prevArray) => {
          const country = countries[index];
          index++;
          return [...prevArray, country];
        });
      } else {
        clearInterval(intervalId);
      }
    };

    clearInterval(intervalId);

    intervalId = setInterval(addCountryWithDelay, 50);
    console.log(countriesArray);

    return () => {
      console.log(countriesArray);
      clearInterval(intervalId);
      setCountriesArray([]);
    };
  }, [buttonClicked, loadedCountries, countries]);

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
            // setCountriesArray([]);

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
          {countriesArray &&
            loadedCountries &&
            countriesArray.map((country) => {
              return (
                <Countries key={country.name.common} countries={country} />
              );
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

// var list = [1, 2, 3, 4, 5];

// for (var i = 0, len = list.length; i < len; i += 1) {
//   (function (i) {
//     setInterval(function () {
//       list[i] += 10;
//       console.log(i + "=>" + list[i] + "\n");
//     }, 5000);
//   })(i);
// }
