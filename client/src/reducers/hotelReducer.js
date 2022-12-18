// import GetUserInfo from "../Components/GetUserInfo";
import React, { useContext } from "react";
import hotelService from "../services/hotelService";
import { AuthContext } from "../firebase/Auth";
import tripservice from "../services/tripService";
import storage from "redux-persist/lib/storage";

const initialState = [
  {
    hotelId: null,
    name: null,
    imageUrl: null,
    rating: null,
    latitude: null,
    longitude: null,
  },
];

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
      const newHotel = {
        hotelId: payload.obj.dupeId,
        name: payload.obj.name,
        imageUrl: payload.obj.image,
        rating: payload.obj.rating,
        latitude: payload.obj.geoCode.latitude,
        longitude: payload.obj.geoCode.longitude,
      };
      return [...state, newHotel];

    case "DELETE_HOTEL":
      copyState = [...state];
      let elemIndex = -1;
      for (let i = 0; i < copyState.length; i++) {
        if (copyState[i].hotelId == payload.location_id) {
          elemIndex = i;
          break;
        }
      }
      if (elemIndex > -1) {
        copyState.splice(elemIndex, 1);
      }
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
    let data = await hotelService.createHotel(tripId, obj);
    dispatch({
      type: "ADD_HOTEL",
      payload: data,
    });
  };
};

const deleteHotel = (tripId, hotelId, hotel) => {
  return async (dispatch, getState) => {
    let data = await tripservice.removeHotelFromTrip(tripId, hotelId);
    dispatch({
      type: "DELETE_HOTEL",
      payload: hotel,
    });
  };
};
export { initializeState, deleteHotel };

export default hotelReducer;
