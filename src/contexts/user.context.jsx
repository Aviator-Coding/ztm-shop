import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";

// holds the actual value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in the userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};
// Provider Component which generates the provider we can wrap around other components
export const UserProvider = ({ children }) => {
  // Create the State for receiving and updating the currentUser State
  // const [currentUser, setCurrentUser] = useState(null);

  // Reducer stores the State
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };
  // create value object with the getter and setter of current user
  const value = { currentUser, setCurrentUser };

  // Runs once the component has mounted
  useEffect(() => {
    async function data() {
      // onAuthStateChangedListener returns a function which we need in order to unsubscribe
      // if not this could lead to memory leaks
      const unsubscribe = onAuthStateChangedListener(async (user) => {
        // if the user Exists Create Document
        if (user) {
          // Create Document gets executes anytime the auth changes it will not create a record if already existing
          // see implementation
          await createUserDocumentFromAuth(user);
        }
        //Set the current User to the response from the authHandler either going to be a user or null
        setCurrentUser(user);
      });
      //Return of UseEffect will always run when a Component Unmounts
      return unsubscribe;
    }
    data();
  }, []);
  // Wraps around of all the other children and exposes the setter and getter function via value
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
