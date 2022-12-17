import React from "react";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  console.log(location.state);
  return (
    <div>
      <h1>Search</h1>
    </div>
  );
}

export default Search;
