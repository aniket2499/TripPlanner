import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
};
const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, composeWithDevTools());
const persistor = persistStore(store);

export default store;
export { persistor };
