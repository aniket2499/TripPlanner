import tripService from "../services/tripService";
import userService from "../services/userService";
import actions from "../actions";
import store from "../store";
// import GetUserInfo from "../Components/getUserInfo";

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
      console.log(
        `${payload.obj.tripDate.startDate.$y}-${payload.obj.tripDate.startDate.$M}-${payload.obj.tripDate.startDate.$D}`
      );
      payload.obj.tripDate.startDate = new Date(
        `${payload.obj.tripDate.startDate.$y}-${payload.obj.tripDate.startDate.$M}-${payload.obj.tripDate.startDate.$D}`
      );
      payload.obj.tripDate.endDate = new Date(
        `${payload.obj.tripDate.endDate.$y}-${payload.obj.tripDate.endDate.$M}-${payload.obj.tripDate.endDate.$D}`
      );
      // console.log(payload.tripDate.startDate);
      while (payload.obj.tripDate.startDate <= payload.obj.tripDate.endDate) {
        console.log("inside while");
        let date = payload.obj.tripDate.endDate
          .toISOString()
          .split("T")[0]
          .split("-");
        let day = date[2];
        let month = date[1];
        let year = date[0];
        date = `${month}/${day}/${year}`;
        const itineraryObject = {
          date: date,
          placesToVisit: [],
        };
        payload.obj.itinerary.push(itineraryObject);
        payload.obj.tripDate.startDate.setDate(
          payload.obj.tripDate.startDate.getDate() + 1
        );
      }

      console.log(payload.obj);
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

    case "ADD_HOTEL_TO_TRIP_ITINERARY":
      console.log(payload.visitDate);
      let newHotel = {
        _id: payload.hotel.dupeId.toString(),
        name: payload.hotel.name,
        image: payload.hotel.image,
      };
      copyState = [...state];
      for (let i = 0; i < copyState.length; i++) {
        if (copyState[i]._id === payload.tripId) {
          for (let j = 0; j < copyState[i].itinerary.length; j++) {
            if (copyState[i].itinerary[j].date === payload.visitDate) {
              console.log("inside add hotel to trip itinerary");
              copyState[i].itinerary[j].placesToVisit.push(newHotel);
            }
          }
        }
      }
      return [...copyState];

    case "DELETE_HOTEL_FROM_TRIP_ITINERARY":
      copyState = [...state];
      console.log("patyload is : " + JSON.stringify(payload));
      for (let i = 0; i < copyState.length; i++) {
        if (copyState[i]._id.toString() === payload.tripId) {
          for (let j = 0; j < copyState[i].itinerary.length; j++) {
            if (copyState[i].itinerary[j].date === payload.visitDate) {
              console.log("the state is :" + copyState[i].itinerary[j]);
              for (
                let k = 0;
                k < copyState[i].itinerary[j].placesToVisit.length;
                k++
              ) {
                if (
                  copyState[i].itinerary[j].placesToVisit[k]._id ===
                  payload.hotelId.toString()
                ) {
                  console.log("entered for deleting the hotel: ");
                  copyState[i].itinerary[j].placesToVisit.splice(k, 1);
                }
              }
            }
          }
        }
      }
      return [...copyState];

    default:
      return state;
  }
};

const initializeState = () => {
  return async (dispatch, getState) => {
    const trips = await tripService.getAllTripsForCurrentUser(
      getState().user[0].id
    );
    dispatch({
      type: "INITIALIZE_TRIP",
      payload: trips,
    });
  };
};

const initializeAllTrips = () => {
  return async (dispatch, getState) => {
    const trips = await tripService.getAllTripsForCurrentUser(
      getState().user[0].id
    );
    for (let i = 0; i < trips.length; i++) {
      dispatch({
        type: "ADD_TRIP",
        payload: trips[i],
      });
    }
  };
};

export { initializeState, initializeAllTrips };

export default tripsReducer;
