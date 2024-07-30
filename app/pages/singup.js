"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function SignUpPage() {

const {emailSignUp} = useUserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await emailSignUp(email, password);
      router.push("/");
    } catch (error) {
      console.log(`Sign Up Error: ${error.message}`);
    }
  };

  const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetPassword = (event) => setPassword(event.target.value);

  return (
    <main>
      <div className="flex justify-center items-center min-h-screen bg-main-background">
        <div className="w-full max-w-md p-8 bg-card-background rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleSetEmail}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleSetPassword}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-navigation text-white p-2 rounded hover:bg-hover-style"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
