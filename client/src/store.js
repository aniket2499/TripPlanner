import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const ThunkMiddleware = require("redux-thunk").default;

const store = createStore(
  rootReducer,
  composeEnhancer(compose, applyMiddleware(ThunkMiddleware))
  // applyMiddleware(ThunkMiddleware),
);

export default store;

