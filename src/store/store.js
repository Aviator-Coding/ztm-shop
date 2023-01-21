// Maybe something to look into later
// const RTKStore = configureStore({reducer: rootReducer});
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

// Example of a custom middleware for Redux
// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type", action.type);
//   console.log("payload", action.payload);
//   console.log("currentState", store.getState());

//   next(action);
//   console.log("nextState", store.getState());
// };

// Middleware run before it hits the reducer
const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);
