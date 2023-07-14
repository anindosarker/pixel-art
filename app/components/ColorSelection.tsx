"use client";
import { useState } from "react";

interface ColorProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

const Color = ({ color, selected, onClick }: ColorProps) => {
  return (
    <div
      className="w-10 h-10 rounded-full mx-2 cursor-pointer"
      style={{
        backgroundColor: color,
        border: selected ? "2px solid black" : "none",
      }}
      onClick={onClick}
    ></div>
  );
};

export default function ColorSelection({ setSelectedColor }: any) {
  const rainbowColors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8B00FF",
  ];
  const [selected, setSelected] = useState<string>("");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setSelected(color);
    console.log(`Selected color: ${color}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md mb-2">
      <div className="flex justify-center mb-4">
        {rainbowColors.map((color, index) => (
          <Color
            key={index}
            color={color}
            selected={selected === color}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
    </div>
  );
}
