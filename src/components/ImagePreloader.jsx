import LoadingSpinner from "./LoadingSpinner";

export default function ImagePreloader({ loaded, src, selectedRegionStatus }) {
  return (
    <div className="image-preloader-container">
      {!loaded && <LoadingSpinner />}

      {loaded && (
        <div className={selectedRegionStatus}>
          <img
            style={{ visibility: loaded ? "visible" : "hidden" }}
            src={src}
            alt="World map"
            className={selectedRegionStatus == "world" ? "bg-world" : "bg"}
          />
        </div>
      )}
    </div>
  );
}
