import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const ThunkMiddleware = require("redux-thunk").default;

// remove all the data from the storage
//storage.removeItem("persist:root");


// const persistConfig = {
//   key: "root",
//   storage,
// };
// const pReducer = persistReducer(rootReducer);

// const store = createStore(
//   pReducer,
//   composeWithDevTools(),
//   applyMiddleware(ThunkMiddleware),
// );

const store = createStore(
  rootReducer,
  composeEnhancer(compose, applyMiddleware(ThunkMiddleware)),
  // applyMiddleware(ThunkMiddleware),
);

const persistor = persistStore(store);

export default store;
// export { persistor };
