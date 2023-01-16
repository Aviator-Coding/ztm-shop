import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzVNhAWwbim7hLfYdLylmwz-tAf5Q9TcM",
  authDomain: "crwn-clothing-db-3bbf6.firebaseapp.com",
  projectId: "crwn-clothing-db-3bbf6",
  storageBucket: "crwn-clothing-db-3bbf6.appspot.com",
  messagingSenderId: "671089635191",
  appId: "1:671089635191:web:305567c289a82eaff7fb72"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Auth Stuff for google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


//--------------------------
//   Fire Store
//--------------------------
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshopt = await getDoc(userDocRef);

  if (!userSnapshopt.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createAt });
    } catch (error) {
      console.log('error Creating user');
    }

  }

  return userDocRef;

};