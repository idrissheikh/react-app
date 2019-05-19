import rootReducer from "./reducer/RootReducer";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const AppReducer = combineReducers({
  rootReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const configStore = () => {
//return createStore(AppReducer, composeEnhancers(applyMiddleware(thunk)));
//};
export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
