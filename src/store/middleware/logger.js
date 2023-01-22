//Example of a custom middleware for Redux
//@TODO Learn more about curling function
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  next(action);
  console.log("nextState", store.getState());
};

export default loggerMiddleware;
