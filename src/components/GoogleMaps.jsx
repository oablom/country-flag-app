import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import marker from "../images/marker-icon.png";

export default function GoogleMaps({ latitude, longitude }) {
  const position = { lat: latitude, lng: longitude };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCu-OmIEreFOxORFpWvRO4yyxwLoHOR7WA">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={10}
      >
        <Marker
          position={position}
          //   icon={{
          //     iconUrl: marker,
          //     scaledSize: new window.google.maps.Size(400, 400),
          //   }}
        />
      </GoogleMap>
    </LoadScript>
  );
}
