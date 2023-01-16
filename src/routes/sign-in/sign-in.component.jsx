import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase.utils"


const SignIn = ()=>{

  const logGoogleUser = async()=>{
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
    createUserDocumentFromAuth(user)
  //  console.log(response)
  }

  return(
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
    </div>
  )
}

export default SignIn