import React, { useContext } from "react";
import attractionService from "../services/attractionService";
import { AuthContext } from "../firebase/Auth";

import tripservice from "../services/tripService";
import actions from "../actions";

// const initialState = [
//   {
//     location_id: null,
//     name: null,
//     latitude: null,
//     longitude: null,
//     num_reviews: null,
//     category: null,
//     address: null,
//     image: null,
//     description: null,
//     rating: null,
//     web_url: null,
//     phone: null,
//     website: null,
//   },
// ];

let copyState = null;
let index = 0;

const attractionReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_ATTRACTION":
      state = [];
      state = payload;
      return state;

    case "ADD_ATTRACTION":
      return [...state, payload];

    case "DELETE_ATTRACTION":
      console.log(payload);
      copyState = state.filter((x) => x._id !== payload.location_id);
      return copyState;

    default:
      return state;
  }
};

const initializeState = (tripId) => {
  return async (dispatch, getState) => {
    let trip = getState().trips.filter((x) => x._id === tripId);
    let attractionsData = [];
    for (let i = 0; i < trip[0].attractions.length; i++) {
      let attraction = await attractionService.getAttractionById(
        trip[0].attractions[i],
      );
      attractionsData.push(attraction);
    }
    dispatch({
      type: "INITIALIZE_ATTRACTION",
      payload: attractionsData,
    });
  };
};

const addAttraction = (tripId, attractionData) => {
  console.log("attractionData");
  console.log(attractionData);
  return async (dispatch, getState) => {
    let obj = {
      location_id: attractionData.locationId,
      name: attractionData.name,
      image: attractionData.image,
      latitude: attractionData.latitude,
      longitude: attractionData.longitude,
      address: attractionData.address,
      startDate: attractionData.startDate,
    };
    console.log("obj ================================");
    console.log(obj);
    let data = await attractionService.createAttraction(
      tripId,
      attractionData.startDate,
      obj,
    );
    dispatch({
      type: "ADD_ATTRACTION",
      payload: attractionData,
    });
    dispatch(
      actions.addAttractionToTripItinerary(
        tripId,
        attractionData,
        attractionData.startDate,
      ),
    );
  };
};

const deleteAttraction = (tripId, attractionId, attractionData) => {
  console.log("deleteRestaurant");
  console.log("tripId", "restaurantId");
  console.log(tripId, attractionId);
  console.log("attraction");
  console.log(attractionId);
  return async (dispatch, getState) => {
    let data = await tripservice.removeAttractionFromTrip(
      tripId,
      attractionId,
      attractionData.startDate.split("/").join("-"),
    );
    dispatch({
      type: "DELETE_ATTRACTION",
      payload: attractionData,
    });
    dispatch(
      actions.deleteAttractionFromTripItinerary(
        tripId,
        attractionId,
        attractionData.startDate,
      ),
    );
  };
};

export { initializeState, addAttraction, deleteAttraction };
export default attractionReducer;
