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

const tripsReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_TRIP":
      state = [];
      state = payload;
      return state;

    case "ADD_TRIP":
      return [...state, payload.obj];

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
