import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Maps from "./Maps";

function Home() {
  const allRestaurants = useSelector((state) => state.restaurants);
  console.log(allRestaurants);

  return (
    <div>
      <Maps />
    </div>
  );
}

export default Home;
