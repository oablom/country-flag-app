export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <p>
        Loading <br /> image(s)...
      </p>
      <div className="loading-spinner"></div>
      {console.log("Loading images...")}
    </div>
  );
}
