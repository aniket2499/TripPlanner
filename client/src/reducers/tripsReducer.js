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
    hotels: [],
    attractions: [],
    explore: [],
    invites: [],
    itinerary: [],
    placesToVisit: [],
    restaurants: [],
  },
];

let copyState = null;
let index = 0;

const tripsReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_TRIP":
      state = [];
      state = payload;
      return state;

    case "ADD_TRIP":
      console.log(payload);
      return [...state, payload.obj];

    case "DELETE_TRIP":
      copyState = [...state];
      copyState = copyState.filter((x) => x.name !== payload.name);
      return [...copyState];

    case "BIN_HOTEL":
      copyState = [...state];
      console.log("inside bin");
      console.log(payload);
      index = copyState.find((x) => x._id === payload.tripId.toString());
      index.hotels.push(payload.location_id.toString());
      return [...copyState];

    case "UNBIN_HOTEL":
      console.log("inside unbin");
      copyState = [...state];
      index = copyState.find((x) => x._id === payload.tripId.toString());
      const elemIndex = index.hotels.indexOf(payload.location_id.toString());
      if (elemIndex > -1) {
        index.hotels.splice(elemIndex, 1);
      }
      return [...copyState];

    default:
      return state;
  }
};

const initializeState = () => {
  return async (dispatch, getState) => {
    const trips = await tripService.getAllTripsForCurrentUser(
      getState().user[0].id,
    );
    dispatch({
      type: "INITIALIZE_TRIP",
      payload: trips,
    });
  };
};

export { initializeState };

export default tripsReducer;
