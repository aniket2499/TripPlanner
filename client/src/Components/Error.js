import React from "react";

function Error() {
  document.getElementById("app-bar").style.display = "none";
  return (
    <div className="error-page">
      <div className="error-div1">
        <h1>404 Error</h1>
      </div>
      <div className="error-div2">
        <h2>This page could not be found</h2>
      </div>
    </div>
  );
}

export default Error;
