import { useState, useEffect } from "react";
import Leaflet from "./Leaflet";
// import GoogleMaps from "./GoogleMaps";

export default function Country({ country }) {
  const [countryMap, setCountryMap] = useState({});
  const [countryUrl, setCountryUrl] = useState("");
  const [latitude, setLatitude] = useState(
    country.capitalInfo?.latlng?.[0] ? country.capitalInfo?.latlng?.[0] : 0
  );
  const [longitude, setLongitude] = useState(
    country.capitalInfo?.latlng?.[1] ? country.capitalInfo?.latlng?.[1] : 0
  );

  // useEffect(() => {
  //   async function fetchCountryMap(country) {
  //     try {
  //       const response = await fetch(
  //         `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${country.name.common}&inputtype=textquery&fields=photos&key=AIzaSyCu-OmIEreFOxORFpWvRO4yyxwLoHOR7WA`
  //       );
  //       const data = await response.json();

  //       let photoUrl = data.candidates[0].photos[0].photo_reference;
  //       setCountryMap(
  //         `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoUrl}&key=AIzaSyCu-OmIEreFOxORFpWvRO4yyxwLoHOR7WA`
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchCountryMap(country);
  // }, []);

  return (
    <div className="modal-content">
      <h4>{country.name.common}</h4>
      <p>Capital: {Array.isArray(country.capital) && country.capital[0]}</p>
      <p>Population: {country.population}</p>
      {/* <img src={countryMap} alt={country.name.common + " map"} /> */}
      {/* // Exempel på hur du använder Leaflet-komponenten */}
      {/* <GoogleMaps latitude={latitude} longitude={longitude} /> */}
      <Leaflet latitude={latitude} longitude={longitude} />
    </div>
  );
}
