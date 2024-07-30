"use client";
import NavBar from "@/app/_components/navbar";
import Image from "next/image";
import Footer from "./_components/footer";
import { useUserAuth } from "@/app/_utils/auth-context";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { user, gitHubSignIn, googleSignIn, emailSignIn, firebaseSignOut } =
    useUserAuth() || {};

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  async function handleGitHubSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(`GitHub sign in error: ${error.message}`);
    }
  }

  async function handleGoogleSignIn() {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(`Google sign in error: ${error.message}`);
    }
  }

  async function handleEmailSignIn() {
    try {
      await emailSignIn(email, password);
    } catch (error) {
      console.log(`Email sign in error: ${error.message}`);
    }
  }

  // async function handleSignOut() {
  //   try {
  //     await firebaseSignOut();
  //   } catch (error) {
  //     console.log(`Error: ${error.message}`);
  //   }
  // }

  const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetPassword = (event) => setPassword(event.target.value);

  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1 justify-center items-center bg-main-background text-font-color">
        {user ? (
          <div>
            <h1 className="text-center">
              Welcome to Pet{" "}
              <p className="bg-navigation rounded text-main-background ">
                Care
              </p>
            </h1>
            <div>
              <img src={user.photoURL} className="rounded-full w-16 h-16" />
              <span>{user.displayName}</span>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md p-8 bg-card-background rounded-lg shadow-md" >
            <section className="flex flex-col pt-5 pb-5 justify-center rounded-md bg-card-background/50" >
              <h1 className="flex justify-center text-3xl text-align left">Login</h1>
              <p className="flex justify-center">
                Doesn't have an account yet?
                <Link href="/pages/signup" className="text-blue hover:underline ">
                  <>Sign Up</>
                </Link>
                <Link href="/pages/page" ><>HW</></Link>
              </p>
              <div className="flex flex-col space-y-4" >
              <label>Email Address</label>
            <input type="email" value={email} onChange={handleSetEmail}  className="p-2 border rounded-lg" placeholder="abc@example.com" required />
            <label>Password</label>
            <input type="password" value={password} onChange={handleSetPassword} className="p-2 border rounded-lg" placeholder="Enter 8 character or more" required />
            <button  className="mt-6 mb-6 w-full bg-navigation hover:bg-hover-style text-font-color font-bold py-2 rounded" onClick={handleEmailSignIn} >Log In</button>
              </div>

              <div className="flex justify-center space-x-5 mt-5">
                <button
                  className="flex bg-navigation rounded-md p-2 hover:bg-hover-style"
                  onClick={handleGitHubSignIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    className="fill-current"
                    height="25"
                    width="25"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                  Sign in with Github
                </button>
                <button 
                  className="flex bg-navigation rounded-md p-2 hover:bg-hover-style" 
                  onClick={handleGoogleSignIn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                    className="fill-current"
                    height="25"
                    width="25"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
      <Footer className="mt-auto" />
    </main>
  );
}
