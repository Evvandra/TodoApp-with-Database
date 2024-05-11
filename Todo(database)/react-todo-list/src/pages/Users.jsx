import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config.js';
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore";

// Ensure to call getFirestore to get the Firestore instance
const firestore = getFirestore();

export default function Users() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Fetch user data from Firestore based on UID
      const fetchUserData = async () => {
        try {
          console.log('Authenticated User UID:', currentUser.uid);

          // Query the 'users' collection to find the document with the corresponding UID
          const userQuery = query(collection(firestore, 'users'), where('uid', '==', currentUser.uid));
          const querySnapshot = await getDocs(userQuery);

          // Check if the query returned any documents
          if (querySnapshot.size > 0) {
            // Get the first document (assuming UID is unique, there should be at most one)
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            console.log('User Data:', userData);

            // Ensure userData.name is not undefined or an empty string before setting the state
            setUserName(userData.name || '');
            setUserEmail(userData.email || '');
          } else {
            console.log('User document does not exist for UID:', currentUser.uid);
            // You can handle this case, for example, by redirecting the user to a profile setup page.
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };

      fetchUserData();
    }
  }, [auth.currentUser]); // Added dependency to useEffect to avoid potential issues

  console.log('Rendering with userName:', userName);


  return (
      <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This is some information about the user.
          </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {userName}
                  </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      johndoe@example.com
                  </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      (123) 456-7890
                  </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      123 Main St
                      Anytown, USA 12345
                  </dd>
              </div>
          </dl>
      </div>
    </div>
  )
}