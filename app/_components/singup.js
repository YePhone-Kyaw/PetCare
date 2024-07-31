"use client";

import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function SignUpPage({ onClose }) {
  const { emailSignUp } = useUserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await emailSignUp(email, password);
      // window.location.href("/");
      onClose();
    } catch (error) {
      setError(error.message);
      console.log(`Sign Up Error: ${error.message}`);
    }
  };

  const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetPassword = (event) => setPassword(event.target.value);
  const handleSetConfirmPassword = (event) => setConfirmPassword(event.target.value);

  return (
    <main>
      <div className="flex justify-center items-center bg-main-background">
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
            <div>
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm your password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleSetConfirmPassword}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-10 bg-navigation text-font-color p-2 rounded hover:bg-hover-style"
            >
              Sign Up
            </button>
          </form>
          <button
            onClick={onClose}
            className="w-full mt-5 bg-gray-300 text-font-color p-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </main>
  );
}
