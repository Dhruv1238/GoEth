import React, { createContext, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    // State to store user data
    const [user, setUser] = useState(null);

    // Function to handle Google sign in with popup
    const handleGoogleSignIn = async () => {
        try {
            // Call the signInWithPopup function from Firebase
            const result = await signInWithPopup(auth, provider);

            // Set the user data in the state
            setUser(result.user);
        } catch (error) {
            console.log(error);
        }
    };

    // Create the context value
    const contextValue = {
        user,
        handleGoogleSignIn,
    };

    // Return the AuthContextProvider with the context value and children
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};