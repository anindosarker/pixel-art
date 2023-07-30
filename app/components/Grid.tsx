"use client";
import React from "react";

export default function Grid() {
  const cells = [];
  for (let i = 1; i <= 4096; i++) {
    cells.push(
      <div
        key={i}
        className="border border-gray-400 w-8 h-8 flex items-center justify-center"
      >
        {i}
      </div>
    );
  }

  return (
    <div className="h-full w-full grid grid-cols-64 grid-rows-64 gap-2">
      {cells}
    </div>
  );
}
