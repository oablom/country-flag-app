export default function LoadingSpinner({ type }) {
  return (
    <div className="spinner-container">
      <p className={type}>
        Loading <br /> {type}...
      </p>
      <div className="loading-spinner"></div>
      {console.log("Loading images...")}
    </div>
  );
}
