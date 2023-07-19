"use client";
import React from "react";
import { signOut } from "next-auth/react";
import getCurrentUser from "../action/getCurrentUser";

export default function Navbar() {
  return (
    <div className="p-5 flex justify-end">
      <button
        className="p-3 bg-blue-600 rounded-md"
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}
