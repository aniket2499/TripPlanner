import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const allRestaurants = useSelector((state) => state.restaurants);
  console.log(allRestaurants);

  return <div>Home</div>;
}

export default Home;
