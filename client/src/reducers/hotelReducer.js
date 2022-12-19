// import GetUserInfo from "../Components/GetUserInfo";
import React, { useContext } from "react";
import hotelService from "../services/hotelService";
import { AuthContext } from "../firebase/Auth";
import tripservice from "../services/tripService";
import actions from "../actions";
import storage from "redux-persist/lib/storage";

let copyState = null;
let index = 0;

const hotelReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_HOTEL":
      state = [];
      state = payload;
      return state;

    case "ADD_HOTEL":
      return [...state, payload];

    case "DELETE_HOTEL":
      // storage.removeItem("persist:root");
      copyState = state.filter((x) => x._id !== payload._id);
      return copyState;

    default:
      return state;
  }
};

const initializeState = (tripId) => {
  return async (dispatch, getState) => {
    let trip = getState().trips.filter((x) => x._id === tripId);
    let hotelsData = [];
    for (let i = 0; i < trip[0].hotels.length; i++) {
      let hotel = await hotelService.getHotelById(trip[0].hotels[i]);
      hotelsData.push(hotel);
    }
    dispatch({
      type: "INITIALIZE_HOTEL",
      payload: hotelsData,
    });
  };
};

const addHotel = (tripId, hotelData) => {
  return async (dispatch, getState) => {
    let obj = {
      location_id: hotelData.dupeId,
      name: hotelData.name,
      image: hotelData.image,
      latitude: hotelData.geoCode.latitude,
      longitude: hotelData.geoCode.longitude,
      rating: hotelData.rating,
    };
    let data = await hotelService.createHotel(tripId, hotelData.startDate, obj);
    dispatch({
      type: "ADD_HOTEL",
      payload: hotelData,
    });
    dispatch(
      actions.addHotelToTripItinerary(tripId, hotelData, hotelData.startDate),
    );
  };
};

const deleteHotel = (tripId, hotelId, hotel) => {
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

export { initializeState, addHotel, deleteHotel };

export default hotelReducer;
