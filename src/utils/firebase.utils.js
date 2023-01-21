import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzVNhAWwbim7hLfYdLylmwz-tAf5Q9TcM",
  authDomain: "crwn-clothing-db-3bbf6.firebaseapp.com",
  projectId: "crwn-clothing-db-3bbf6",
  storageBucket: "crwn-clothing-db-3bbf6.appspot.com",
  messagingSenderId: "671089635191",
  appId: "1:671089635191:web:305567c289a82eaff7fb72",
};
//--------------------------
//   FireBase Auth
//--------------------------
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Auth Stuff for google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Auth Providers
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const signInWithEmailAndPasswordRequest = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//--------------------------
//   Fire Store
//--------------------------
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error Creating user");
    }
  }

  return userDocRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // Gets the current Collection Reference
  const collectionRef = collection(db, collectionKey);

  // Get a new write batch
  const batch = writeBatch(db);

  // Loop over the array of objects to add and add it to the Batch set
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  // Commit the batch
  await batch.commit();
};

// Get the Categories from FireStore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }
  //, {});

  //return categoryMap;
};
