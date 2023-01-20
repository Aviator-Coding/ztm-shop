import {
  signInWithGooglePopup,
  signInWithEmailAndPasswordRequest,
} from "../../utils/firebase.utils";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //Log in with google
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
  };

  // Login Form Submit Handler
  const logInWithEmail = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInWithEmailAndPasswordRequest(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  // Form Field Change Handler
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Reset the Logins Form Field
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <SignInContainer>
      <h2>Already have an Account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={logInWithEmail}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={onInputChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={onInputChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            onClick={logGoogleUser}
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="submit"
          >
            Sign in with google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
