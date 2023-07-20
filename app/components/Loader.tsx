import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-white rounded-full animate-spin"></div>
    </div>
  );
}
