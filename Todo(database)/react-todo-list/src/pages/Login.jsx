import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import '../App.css';
import { auth, provider, db } from '../firebase/config.js';
import { useState } from "react";
import { handleCredentials } from '../pages/functionauth.jsx';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

export default function Login() {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const googleResult = await signInWithPopup(auth, provider);
      const googleUser = googleResult.user;
      console.log("Google Sign In:", googleUser);
  
      // Use the display name if available, otherwise use the email split
      const name = googleUser.displayName || googleUser.email.split('@')[0];
  
      // Check if the user exists in Firestore (you can customize this based on your data model)
      const userRef = doc(db, 'users', googleUser.uid);
      const userDoc = await getDoc(userRef);
  
      // If the user doesn't exist in Firestore, add them
      if (!userDoc.exists()) {
        await addDoc(collection(db, 'users'), {
          uid: googleUser.uid,
          email: googleUser.email,
          name: name,
          // Add any other fields you want to store
        });
        console.log('User document created successfully.');
      } else {
        console.log('User document already exists.');
      }
  
      navigate("/Landing");
    } catch (error) {
      console.error("Google Sign In Error:", error.message);
    }
  };
  
  

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate("/Landing");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert('Email sent! Check your inbox for password reset instructions.')
  }

  
  

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="flex flex-col items-center">
            <button type="button" onClick={handleGoogle}
              className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
            >
              <div className="bg-white p-2 rounded-full">
                <svg className="w-4 " viewBox="0 0 533.5 544.3">
                    <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4" />
                    <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853" />
                    <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04" />
                    <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335" />
                </svg>
              </div>
              <span className="ml-4">Sign In with Google</span>
            </button>
            <div className="mt-4 flex items-center justify-between w-full">
              <span className="border-b w-1/2 lg:w-1/4"></span>
              <span className="text-xs text-center text-gray-500 uppercase">
                or login with email
              </span>
              <span className="border-b w-1/2 lg:w-1/4"></span>
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={(e) => { handleCredentials(e, userCredentials, setUserCredentials); }}
              type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              onChange={(e) => { handleCredentials(e, userCredentials, setUserCredentials); }}
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a
            href="#"
            onClick={handlePasswordReset}
            className="text-xs text-purple-600 hover:underline"
          >
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              onClick={(e) => { handleLogin(e, userCredentials, setError); }}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
          {error &&
            <span className="text-sm text-red-600">
              {error}
            </span>
          }
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link to="/Register" className="font-medium text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
