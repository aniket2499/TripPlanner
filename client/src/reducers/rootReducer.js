import { combineReducers } from "redux";
import attractionReducer from "./attractionReducer";
import hotelReducer from "./hotelReducer";
import restReducer from "./restReducer";
import tripsReducer from "./tripsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  attractions: attractionReducer,
  hotels: hotelReducer,
  restaurants: restReducer,
  trips: tripsReducer,
});

export default rootReducer;
