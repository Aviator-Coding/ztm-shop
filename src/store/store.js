// Maybe something to look into later
// const RTKStore = configureStore({reducer: rootReducer});
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware run before it hits the reducer
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean);

// Redux Dev Tools
const composedEnhancer =
  typeof window === "object" &&
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// Compose is a regular call enhanced is with dev tools
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

// root-reducer
export const store =
  createStore(persistedReducer, undefined, composedEnhancers) || compose;

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
