import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgP8CXOauUROh1miVJ81uFbTjxd1rAkOQ",
  authDomain: "todo-app-7c432.firebaseapp.com",
  projectId: "todo-app-7c432",
  storageBucket: "todo-app-7c432.appspot.com",
  messagingSenderId: "49904823224",
  appId: "1:49904823224:web:2f9b6c07448d0ae5e1fd4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, provider };
