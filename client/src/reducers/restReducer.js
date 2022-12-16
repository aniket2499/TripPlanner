import React, { useContext } from "react";
import restaurantService from "../services/restaurantService";
import { AuthContext } from "../firebase/Auth";

const initialState = [
  {
    location_id: null,
    name: null,
    latitude: null,
    longitude: null,
    num_reviews: null,
    category: null,
    rating: null,
    web_url: null,
    address: null,
    price_level: null,
    image: null,
    description: null,
    phone: null,
    price: null,
    website: null,
  },
];

let copyState = null;

const restReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_RESTAURANT":
      state = payload;
      return state;
    case "ADD_RESTAURANT":
      console.log("add rest action");
      return [
        ...state,
        {
          location_id: payload.location_id,
          name: payload.name,
          latitude: payload.latitude,
          longitude: payload.longitude,
          num_reviews: payload.num_reviews,
          category: payload.category,
          rating: payload.rating,
          web_url: payload.web_url,
          address: payload.address,
          price_level: payload.price_level,
          image: payload.image,
          description: payload.description,
          phone: payload.phone,
          price: payload.price,
          website: payload.website,
        },
      ];

    case "DELETE_RESTAURANT":
      copyState = [...state];
      copyState = copyState.filter(
        (x) => x.location_id !== payload.location_id,
      );
      return [...copyState];

    default:
      return state;
  }
};

const initializeState = (tripId) => {
  console.log("trip id here in restreducer:" + tripId);
  return async (dispatch, getState) => {
    let trip = getState().trips.filter((x) => x._id === tripId);
    console.log("trip in restreducer:" + JSON.stringify(getState().trips));
    console.log(JSON.stringify(trip) + "++++++++++++++++++TRIP is");
    let restaurantsData = [];
    for (let i = 0; i < trip[0].restaurants.length; i++) {
      let restaurant = await restaurantService.getRestaurantById(
        trip[0].restaurants[i],
      );
      console.log(restaurantsData);
      restaurantsData.push(restaurant);
    }

    console.log("restaurants aniket:" + restaurantsData);
    dispatch({
      type: "INITIALIZE_RESTAURANT",
      payload: restaurantsData,
    });
    // console.log("entered in the initalization stat:" + getState().user[0].id);
    // filtering hotels for the current trip

    //
  };
};

export { initializeState };

export default restReducer;
