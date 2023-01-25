// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs35PmrOQYgawn0OXD_f7zzykMeLJUI5k",
  authDomain: "yt-clone-d191c.firebaseapp.com",
  projectId: "yt-clone-d191c",
  storageBucket: "yt-clone-d191c.appspot.com",
  messagingSenderId: "428074540252",
  appId: "1:428074540252:web:d34e59a1ae699450c2e819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app