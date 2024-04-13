import React, { createContext, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';


// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    // State to store user data
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [userType, setUserType] = useState(null);
    // const storedUser = localStorage.getItem('user');
    // const initialUserState = storedUser ? JSON.parse(storedUser) : null;
    // const [user, setUser] = useState(initialUserState);


    console.log(user);

    // const userDocRef = doc(db, 'users', user.email);

    // console.log(userDocRef);


    // Function to handle Google sign in with popup
    const handleGoogleSignIn = async () => {
        try {
            // Call the signInWithPopup function from Firebase
            const result = await signInWithPopup(auth, provider);

            // Set the user data in the state
            localStorage.setItem('user', JSON.stringify(result.user));
            setUser(JSON.parse(localStorage.getItem('user')));

            // Get a reference to the user's document
            if (userType === 'user') {
                const userDocRef = doc(db, 'users', result.user.email);
            }else if (userType === 'driver') {
                const userDocRef = doc(db, 'Drivers', result.user.email);
            }

            // Try to get the user's document
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                // The user's document exists, so they are already registered
                console.log('User is already registered');
            } else {
                // The user's document does not exist, so register them
                await setDoc(userDocRef, {
                    email: result.user.email,
                    points: 0,
                });

                console.log('User has been registered');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Create the context value
    const contextValue = {
        user,
        handleGoogleSignIn,
        userType,
        setUserType
    };

    // Return the AuthContextProvider with the context value and children
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};