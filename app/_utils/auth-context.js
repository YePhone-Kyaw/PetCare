"use client";

import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";


const AuthContext = createContext();

export const AuthContextProvider = ( {children} ) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const gitHubSignIn = () => {
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const emailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const emailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // const emailAndPasswordSignIn = (email, password) => {
    //     return signInWithEmailAndPassword(auth, email, password);
    // };
    

    const firebaseSignOut = () => {
        return signOut(auth);
    };

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, loading, gitHubSignIn, googleSignIn, emailSignUp, emailSignIn, firebaseSignOut}} >
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};