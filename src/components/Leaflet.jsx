import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

export default function Leaflet({ latitude, longitude }) {
  const position = [latitude, longitude];

  const mapSytle = {
    width: "100%",
    height: "400px",
    // minHeight: "400px",
  };

  return (
    <MapContainer
      center={position}
      style={mapSytle}
      // className="leaflet-container"
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        // className="leaflet-tile-layer"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
