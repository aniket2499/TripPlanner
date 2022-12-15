import tripService from "../services/tripService";
import userService from "../services/userService";
import actions from "../actions";
import store from "../store";
// import GetUserInfo from "../Components/getUserInfo";

const initialState = [
  {
    _id: null,
    cur_location: null,
    destination: null,
    tripDate: {
      startDate: null,
      endDate: null,
    },
    destination_lat: null,
    destination_long: null,
    userId: null,
    tripName: null,
    hotel: [],
    attractions: [],
    explore: [],
    invites: [],
    itinerary: [],
    placesToVisit: [],
    restaurants: [],
  },
];

let copyState = null;

const tripsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log("payload", payload);
  console.log("type", type);
  switch (type) {
    case "INITIALIZE_TRIP":
      console.log("payload is aniket: ", payload);
      state = payload;
      return [state];
    case "ADD_TRIP":
      return [
        ...state,
        {
          trip_id: payload.trip_id,
          cur_location: payload.cur_location,
          destination: payload.destination,
          startDate: payload.startDate,
          endDate: payload.endDate,
          destination_lat: payload.destination_lat,
          destination_long: payload.destination_long,
          userId: payload.userId,
          tripName: payload.tripName,
          hotels: payload.hotels,
          attractions: payload.attractions,
          explore: payload.explore,
          invites: payload.invites,
          itinerary: payload.itinerary,
          placesToVisit: payload.placesToVisit,
          restaurants: payload.restaurants,
        },
      ];

    case "DELETE_TRIP":
      copyState = [...state];
      copyState = copyState.filter((x) => x.name !== payload.name);
      return [...copyState];

    default:
      return state;
  }
};

const initializeState = () => {
  return async (dispatch, getState) => {
    console.log("entered in the initalization stat:" + getState().user[0].id);
    const trips = await tripService.getAllTripsForCurrentUser(
      getState().user[0].id,
    );
    console.log("trips are aniket:" + trips);
    dispatch({
      type: "INITIALIZE_TRIP",
      payload: trips,
    });
  };
};

export { initializeState };

export default tripsReducer;
