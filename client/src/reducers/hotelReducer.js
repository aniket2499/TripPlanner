// import GetUserInfo from "../Components/GetUserInfo";
import React, { useContext } from "react";
import hotelService from "../services/hotelService";
import { AuthContext } from "../firebase/Auth";

function GGetUserInfo() {
  const currUser = useContext(AuthContext);
  console.log("hehrehrberbej");
  if (currUser) {
    console.log(currUser);
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
      console.log("payload is aniket: ", payload);
      state = [];
      state = payload;
      return state;

    case "ADD_HOTEL":
      console.log("GetUserInfo");
      const info = GGetUserInfo();
      console.log(info);
      return [
        ...state,
        {
          location_id: payload.location_id,
          name: payload.name,
          imageUrl: payload.imageUrl,
          rating: payload.rating,
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
      ];

    case "DELETE_HOTEL":
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
  return async (dispatch, getState) => {
    let trip = getState().trips.filter((x) => x._id === tripId);
    console.log(trip);
    // console.log("entered in the initalization stat:" + getState().user[0].id);
    trip.hotels.forEach(async (hotel) => {
      const hotels = await hotelService.getHotelById(hotel);
      console.log(hotels);
      dispatch({
        type: "ADD_HOTEL",
        payload: hotels,
      });
    });
    //
    console.log(tripId);
    dispatch({
      type: "INITIALIZE_HOTEL",
      // payload: hotels,
    });
  };
};

export { initializeState };

export default hotelReducer;
