// import GetUserInfo from "../Components/GetUserInfo";
import React, { useContext } from "react";
import hotelService from "../services/hotelService";
import { AuthContext } from "../firebase/Auth";
import tripservice from "../services/tripService";
import storage from "redux-persist/lib/storage";

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
        _id: payload.id,
        location_id: payload.location_id,
        name: payload.name,
        imageUrl: payload.image,
        rating: payload.rating,
        latitude: payload.latitude,
        longitude: payload.longitude,
      };
      console.log("newHotel is aniket:" + newHotel);
      return [...state, newHotel];

    case "DELETE_HOTEL":
      copyState = [...state];
      console.log("inside delete hotel");
      console.log(payload);
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
    console.log(hotelData);
    let obj = {
      location_id: hotelData.dupeId,
      name: hotelData.name,
      image: hotelData.image,
      latitude: hotelData.geoCode.latitude,
      longitude: hotelData.geoCode.longitude,
      rating: hotelData.rating,
    };
    let data = await hotelService.createHotel(tripId, obj);
    let tripData = await tripservice.addHotelToTrip(tripId, data.id);
    console.log("data is aniket: " + JSON.stringify(data));
    dispatch({
      type: "ADD_HOTEL",
      payload: data,
    });
    dispatch({
      type: "ADD_HOTEL_ITINERARY",
      payload: data,
    });
  };
};

const deleteHotel = (tripId, hotelId, hotel) => {
  return async (dispatch, getState) => {
    console.log("inside here ********************************");
    console.log(tripId, hotelId);
    console.log(hotel);
    console.log("anike id is: " + hotelId);
    console.log(hotel);
    let data = await tripservice.removeHotelFromTrip(
      tripId,
      hotelId.toString(),
    );
    // dispatch({
    //   type: "DELETE_HOTEL",
    //   payload: hotel,
    // });
  };
};

export { initializeState, addHotel, deleteHotel };

export default hotelReducer;
