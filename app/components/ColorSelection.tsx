"use client";
import { useState } from "react";

interface ColorProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

const Color = ({ color, selected, onClick }: ColorProps) => {
  if (color === "#ffffff") {
    return (
      <div
        className="w-10 h-10 mx-2 cursor-pointer rounded-full"
        style={{
          backgroundColor: color,
          border: selected ? "2px solid black" : "2px solid gray",
        }}
        onClick={onClick}
      ></div>
    );
  }
  return (
    <div
      className="w-10 h-10 mx-2 cursor-pointer rounded-full"
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
    "#0035ff",
    "#fff707",
    "#ffffff",
    "#000000",
    "#fe0000",
    "#15d200",
    "#5508ff",
    "#ff41a1",
    "#ff5730",
  ];
  const [selected, setSelected] = useState<string>("");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setSelected(color);
  };

  return (
    <div className="p-4 h-full mr-5 bg-white rounded-lg shadow-md mb-4">
      <div className="flex flex-col gap-3 items-center justify-center mb-4">
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
