import tripService from "../services/tripService";
import userService from "../services/userService";
// import GetUserInfo from "../Components/getUserInfo";

const initialState = [
  {
    name: null,
    userId: null,
    cur_location: null,
    destination: null,
    destination_lat: null,
    destination_long: null,
    start_date: null,
    end_date: null,
    hotels: [],
  },
];

let copyState = null;

const tripsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TRIP":
      return [
        ...state,
        {
          name: payload.name,
          userId: payload.userId,
          cur_location: payload.cur_location,
          destination: payload.destination,
          start_date: payload.start_date,
          end_date: payload.end_date,
          destination_lat: payload.destination_lat,
          destination_long: payload.destination_long,
          hotels: payload.hotels,
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

export default tripsReducer;
