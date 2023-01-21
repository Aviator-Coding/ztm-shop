import { createContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { setCurrentUser } from "./store/user/user.action";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase.utils";

const App = () => {
  // Passes the Action the the root-reducer
  const dispatch = useDispatch();

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
        dispatch(setCurrentUser(user));
      });
      //Return of UseEffect will always run when a Component Unmounts
      return unsubscribe;
    }
    data();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* This will render the Defaults if no Route has been given besides / */}
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
