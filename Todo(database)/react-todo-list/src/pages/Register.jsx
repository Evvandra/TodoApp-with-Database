import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import '../App.css';
import {auth, db} from '../firebase/config.js';
import { useState } from "react";
import { handleCredentials } from '../pages/functionauth.jsx';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
// import { setUser } from "./usersSlice";


export default function Register() {
//   const dispatch = useDispatch();  
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  function handleSignup(e) {
    e.preventDefault();
    setError("");
  
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password, userCredentials.userName)
      .then(async (userCredential) => {
        console.log(userCredential.user);
        await addDoc(collection(db, 'users'), {
          uid: userCredential.user.uid, 
          email: userCredentials.email,
          Name: userCredentials.userName
        });
  
        navigate("/Landing");
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                   Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="userName"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input onChange={(e) => { handleCredentials(e, userCredentials, setUserCredentials); }}
                            type="text" name="userName"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="email" 
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input onChange={(e) => { handleCredentials(e, userCredentials, setUserCredentials); }}
                            type="email" name="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input onChange={(e) => { handleCredentials(e, userCredentials, setUserCredentials); }}
                            type="password" name="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="confirm password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm Password
                        </label>
                        <input onChange={(e) => { handleCredentials(e, userCredentials, setUserCredentials); }}
                            type="password" name="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <Link to="/Landing">
                      <div className="mt-6">
                          <button onClick={(e)=>{handleSignup(e)}} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                              Register
                          </button>
                      </div>
                    </Link>
                    {
                        error&&
                        <span class="text-sm text-red-600">
                            {error}
                        </span>
                    }

                </form>
            </div>
        </div>
    );
}