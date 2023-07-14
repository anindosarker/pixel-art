'use client';
import React from "react";

interface ColorSelectionProps {
    setSelectedColor: (color: string) => void;
}

export default function ColorSelection({ setSelectedColor }: ColorSelectionProps) {
  const rainbowColors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8B00FF",
  ];

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    console.log(`Selected color: ${color}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md mb-5">
      <div className="flex justify-center mb-4">
        {rainbowColors.map((color, index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-full mx-2 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
    </div>
  );
}
