import React, { useContext } from "react";
import attractionService from "../services/attractionService";
import { AuthContext } from "../firebase/Auth";
const initialState = [
  {
    location_id: null,
    name: null,
    latitude: null,
    longitude: null,
    num_reviews: null,
    category: null,
    address: null,
    image: null,
    description: null,
    rating: null,
    web_url: null,
    phone: null,
    website: null,
  },
];

let copyState = null;

const attractionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_ATTRACTION":
      state = [];
      state = payload;
      return state;
    case "ADD_ATTRACTION":
      return [
        ...state,
        {
          location_id: payload.location_id,
          name: payload.name,
          latitude: payload.latitude,
          longitude: payload.longitude,
          num_reviews: payload.num_reviews,
          category: payload.category,
          address: payload.address,
          image: payload.image,
          description: payload.description,
          rating: payload.rating,
          web_url: payload.web_url,
          phone: payload.phone,
          website: payload.website,
        },
      ];

    case "DELETE_ATTRACTION":
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
  console.log("trip id here in attractionreducer:" + tripId);
  return async (dispatch, getState) => {
    let trip = getState().trips.filter((x) => x._id === tripId);
    console.log("current Trip++++++++++++++" + JSON.stringify(trip));
    let attractionsData = [];
    for (let i = 0; i < trip[0].attractions.length; i++) {
      let attraction = await attractionService.getAttractionById(
        trip[0].attractions[i],
      );
      attractionsData.push(attraction);
    }
    console.log("attractions aniket:" + attractionsData);
    dispatch({
      type: "INITIALIZE_ATTRACTION",
      payload: attractionsData,
    });
    // console.log("entered in the initalization stat:" + getState().user[0].id);
    // filtering hotels for the current trip

    //
  };
};

export { initializeState };
export default attractionReducer;
