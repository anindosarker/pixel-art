"use client";
import { useState } from "react";
import { BsEraserFill } from "react-icons/bs";

interface ColorProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

const Color = ({ color, selected, onClick }: ColorProps) => {
  if (color === "#ffffff") {
    return (
      <div
        className="flex mx-2 h-10 w-10 cursor-pointer rounded-full"
        style={{
          backgroundColor: color,
          border: selected ? "2px solid black" : "2px solid gray",
        }}
        onClick={onClick}
      ></div>
    );
  }

  if (color === "#000000") {
    return (
      <div
        className="mx-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
        onClick={onClick}
        style={{
          border: selected ? "2px solid black" : "none",
        }}
      >
        <BsEraserFill color="black" size={28} className="" />
      </div>
    );
  }
  return (
    <div
      className="mx-2 h-4 w-4 sm:h-10 sm:w-10 cursor-pointer rounded-full"
      style={{
        backgroundColor: color,
        border: selected ? "2px solid black" : "none",
      }}
      onClick={onClick}
    >
      {/* {color === "#000000" ? (
        <BsEraserFill/>
      ) : ""} */}
    </div>
  );
};

export default function ColorSelection({ setSelectedColor }: any) {
  const rainbowColors = [
    "#0035ff",
    "#fff707",
    "#ffffff",
    "#fe0000",
    "#15d200",
    "#592693",
    "#ff41a1",
    "#ff5730",
    "#000000",
  ];
  const [selected, setSelected] = useState<string>("");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setSelected(color);
  };

  return (
    <div className="mb-4 flex max-h-full max-w-2xl rounded-lg bg-white p-2 sm:p-4 shadow-md sm:mb-0">
      <div className="mb-4 flex items-center justify-center gap-3 sm:mb-0 sm:flex-col">
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
