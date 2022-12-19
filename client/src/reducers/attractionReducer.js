import React, { useContext } from "react";
import attractionService from "../services/attractionService";
import { AuthContext } from "../firebase/Auth";

import tripservice from "../services/tripService";
import actions from "../actions";

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
      copyState = state.filter((x) => x._id !== payload._id);
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
  return async (dispatch, getState) => {
    let obj = {
      location_id: attractionData.dupeId,
      name: attractionData.name,
      image: attractionData.image,
      latitude: attractionData.geoCode.latitude,
      longitude: attractionData.geoCode.longitude,
      rating: attractionData.rating,
    };
    let data = await attractionService.createHotel(
      tripId,
      attractionData.startDate,
      obj,
    );
    dispatch({
      type: "ADD_HOTEL",
      payload: attractionData,
    });
    dispatch(
      actions.addHotelToTripItinerary(
        tripId,
        attractionData,
        attractionData.startDate,
      ),
    );
  };
};

const deleteAttraction = (tripId, hotelId, hotel) => {
  return async (dispatch, getState) => {
    let data = await tripservice.removeHotelFromTrip(
      tripId,
      hotelId,
      hotel.startDate.split("/").join("-"),
    );
    dispatch({
      type: "DELETE_HOTEL",
      payload: hotel,
    });
    dispatch(
      actions.deleteHotelFromTripItinerary(tripId, hotelId, hotel.startDate),
    );
  };
};

export { initializeState, addAttraction, deleteAttraction };
export default attractionReducer;
