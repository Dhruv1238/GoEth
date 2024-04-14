import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'; // Adjust the path as necessary

const SendLocationButton = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set the user state
        setUser(user);
        // Determine user type here or fetch it from Firestore
        // For demonstration, setting userType to 'user'
        setUserType('user');
      } else {
        // User is signed out
        console.log("User is not logged in.");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const sendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const message = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

    if (user && userType) {
      let userDocRef;
      if (userType === 'user') {
        userDocRef = doc(db, 'users', user.email);
      } else if (userType === 'driver') {
        userDocRef = doc(db, 'Drivers', user.email);
      }

      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const phoneNumber = userDocSnap.data().whatsappnumbers;
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("User is not logged in.");
    }
  };

  return (
    <button className='w-20 h-20 rounded-full bg-gray-600 text-white' onClick={sendLocation}>Go</button>

  );
};

export default SendLocationButton;
