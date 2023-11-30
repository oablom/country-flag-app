import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import ImagePreloader from "./components/ImagePreloader";
import africa from "./components/images/map-of-africa.png";
import asia from "./components/images/mapofasia.png";
import europe from "./components/images/map-of-europe.png";
import world from "./components/images/world-physical-map--550.jpg";

import CountryFlagApp from "./components/CountryFlagApp";

function App() {
  const [selectedRegionStatus, setSelectStatus] = useState("world");
  const [loaded, setLoaded] = useState(false);
  const [countrySrc] = useState([africa, asia, europe, world]);

  const selectedRegionParent = (value) => {
    setSelectStatus(value);
  };

  const mapUrl = () => {
    if (selectedRegionStatus === "africa") {
      return africa;
    } else if (selectedRegionStatus === "asia") {
      return asia;
    } else if (selectedRegionStatus === "europe") {
      return europe;
    } else if (selectedRegionStatus === "world") {
      return world;
    }
    return "";
  };
  useEffect(() => {
    mapUrl();
    console.log(mapUrl());
  }, [selectedRegionStatus]);

  useEffect(() => {
    try {
      countrySrc.forEach((src) => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
          setLoaded(true);
        };
      });
    } catch (error) {
      document.querySelector("." + { selectedRegionStatus }).innerHTML =
        "Error loading images" + error;
    }
  }, [selectedRegionStatus]);

  return (
    <div className="App">
      <ImagePreloader
        src={mapUrl()}
        loaded={loaded}
        selectedRegionStatus={selectedRegionStatus}
      />
      <CountryFlagApp selectedRegion={selectedRegionParent} />
    </div>
  );
}

export default App;
