import tripService from "../services/tripService";
import userService from "../services/userService";
// import GetUserInfo from "../Components/getUserInfo";

const initialState = [
  {
    trip_id: null,
    cur_location: null,
    destination: null,
    startDate: null,
    endDate: null,
    destination_lat: null,
    destination_long: null,
    userId: null,
    tripName: null,
  },
];

let copyState = null;

const tripsReducer = (state, action) => {
  const { type, payload } = action;
  console.log("payload", payload);
  console.log("type", type);
  switch (type) {
    case "INITIALIZE_TRIP":
      console.log(state.user.id);
      return [
        {
          trip_id: "asdf",
          cur_location: "asdf",
          destination: "asdf",
          startDate: "asdf",
          endDate: "asdf",
          destination_lat: "asdf",
          destination_long: "asdf",
          userId: "asdf",
          tripName: "asdf",
        },
      ];
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
