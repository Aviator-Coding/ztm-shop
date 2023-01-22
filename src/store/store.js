// Maybe something to look into later
// const RTKStore = configureStore({reducer: rootReducer});
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware run before it hits the reducer
const middleWares = [process.env.NODE_ENV === "development" && logger].filter(Boolean);

// Redux Dev Tools
const composedEnhancer =
  process.env.NODE_ENV !== "production" &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// Compose is a regular call enhanced is with dev tools
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

// root-reducer
export const store =
  createStore(persistedReducer, undefined, composedEnhancers) || compose;

export const persistor = persistStore(store);
