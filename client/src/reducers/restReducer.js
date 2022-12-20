import React, { useContext } from "react";
import restaurantService from "../services/restaurantService";
import tripservice from "../services/tripService";
import { AuthContext } from "../firebase/Auth";

// const initialState = [
//   {
//     location_id: null,
//     name: null,
//     latitude: null,
//     longitude: null,
//     num_reviews: null,
//     category: null,
//     rating: null,
//     web_url: null,
//     address: null,
//     price_level: null,
//     image: null,
//     description: null,
//     phone: null,
//     price: null,
//     website: null,
//   },
// ];

let copyState = null;

const restReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_RESTAURANT":
      state = payload;
      return state;
    case "ADD_RESTAURANT":
      return [...state, payload];

    case "DELETE_RESTAURANT":
      // delete restaurant
      console.log("payload");
      console.log(payload);
      copyState = state.filter((x) => x.location_id !== payload.id);
      return copyState;

    default:
      return state;
  }
};

const initializeState = (tripId) => {
  return async (dispatch, getState) => {
    let trip = getState().trips.filter((x) => x._id === tripId);

    let restaurantsData = [];
    for (let i = 0; i < trip[0].restaurants.length; i++) {
      let restaurant = await restaurantService.getRestaurantById(
        trip[0].restaurants[i],
      );
      restaurantsData.push(restaurant);
    }

    dispatch({
      type: "INITIALIZE_RESTAURANT",
      payload: restaurantsData,
    });
    // console.log("entered in the initalization stat:" + getState().user[0].id);
    // filtering hotels for the current trip

    //
  };
};

const addRestaurant = (tripId, restaurantData) => {
  return async (dispatch, getState) => {
    let obj = {
      location_id: restaurantData.locationId,
      name: restaurantData.name,
      image: restaurantData.image,
      latitude: restaurantData.latitude,
      longitude: restaurantData.longitude,
      rating: restaurantData.rating,
      address: restaurantData.address,
      priceLevel: restaurantData.priceLevel,
    };
    console.log("restaurantData");
    console.log(restaurantData);
    let data = await restaurantService.createRestaurant(
      tripId,
      restaurantData.startDate,
      obj,
    );
    dispatch({
      type: "ADD_RESTAURANT",
      payload: restaurantData,
    });
    // dispatch(
    //   actions.addHotelToTripItinerary(tripId, hotelData, hotelData.startDate),
    // );
  };
};

const deleteRestaurant = (tripId, restaurantId, restaurant) => {
  console.log("deleteRestaurant");
  console.log("tripId", "restaurantId");
  console.log(tripId, restaurantId);
  console.log("restaurant");
  console.log(restaurant);
  return async (dispatch, getState) => {
    let data = await tripservice.removeRestaurantFromTrip(
      tripId,
      restaurantId,
      restaurant.startDate.split("/").join("-"),
    );
    dispatch({
      type: "DELETE_RESTAURANT",
      payload: restaurantId,
    });
    // dispatch(
    //   actions.deleteHotelFromTripItinerary(tripId, hotelId, hotel.startDate),
    // );
  };
};

export { initializeState, addRestaurant, deleteRestaurant };

export default restReducer;
