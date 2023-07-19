'use client';
import React, { useState } from 'react'
import {signIn} from 'next-auth/react'

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = { email, password };

        signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        }).then((callback)=> {
            if (callback?.ok) {
                console.log("success")
            } else {
                setErrorMsg("Invalid login")
            }
        })
    }

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
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
