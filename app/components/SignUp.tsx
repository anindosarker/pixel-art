"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);

      const data = { email, username, password };
      axios
        .post("/api/createUser", data)
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setEmail("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          router.push("/login");
        });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-black rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-gray-300 rounded-lg px-4 py-2 text-black"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border-gray-300 rounded-lg px-4 py-2 text-black"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border-gray-300 rounded-lg px-4 py-2 text-black"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`w-full border-gray-300 text-black rounded-lg px-4 py-2 ${
                passwordsMatch ? "" : "border-red-500"
              }`}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {!passwordsMatch && (
              <p className="text-red-500 mt-2">Passwords do not match</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Submit
          </button>
        </form>
        <div className="p-5 mt-5 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
