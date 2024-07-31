"use client";

import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
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

  const emailSignUp = async (email, password) => {
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.")
    } 
    try {
    return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) { 
        console.log(`Password Error: ${error.message}`);
    }
  };

  const emailSignIn = async (email, password) => {
    try {
      console.log("Attempting to sign in with:", email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign in successful");
    } catch (error) {
      console.error(`Firebase Auth Error: ${error.code}, ${error.message}`);
      if (error.code) {
        throw new Error("Invalid email or password. Please try again.");
      }
    }
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        gitHubSignIn,
        googleSignIn,
        emailSignUp,
        emailSignIn,
        firebaseSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
