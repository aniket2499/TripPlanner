// import GetUserInfo from "../Components/GetUserInfo";
import React, { useContext } from "react";
import hotelService from "../services/hotelService";
import { AuthContext } from "../firebase/Auth";
import tripservice from "../services/tripService";

function GGetUserInfo() {
  const currUser = useContext(AuthContext);
  if (currUser) {
    return currUser;
  } else return null;
}

const initialState = [
  {
    location_id: null,
    name: null,
    imageUrl: null,
    rating: null,
    latitude: null,
    longitude: null,
  },
];

let copyState = null;

const hotelReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_HOTEL":
      state = [];
      state = payload;
      return state;

    case "ADD_HOTEL":
      console.log("entered in the add hotel reducer");
      console.log(payload);
      return [...state, payload];
    // return [...state, payload.obj];

    case "DELETE_HOTEL":
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
    // console.log("entered in the initalization stat:" + getState().user[0].id);
    // filtering hotels for the current trip
    //
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
export { initializeState, addHotel, deleteHotel };

export default hotelReducer;
