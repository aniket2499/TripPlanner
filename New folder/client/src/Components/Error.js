import React from "react";
import { useLocation } from "react-router-dom";

function Error() {
  const location = useLocation();
  console.log(location);
  // document.getElementById("app-bar").style.display = "none";
  return (
    <div className="error-page">
      <div className="error-div1">
        <h1>404 Error</h1>
      </div>
      <div className="error-div2">
        <h2>
          {location.state && location.state.message
            ? location.state.message
            : `This page could not be found`}
        </h2>
      </div>
    </div>
  );
}

export default Error;
