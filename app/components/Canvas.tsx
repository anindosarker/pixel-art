"use client";
import { useState } from "react";
import DrawingBoard from "./DrawingBoard";

export default function Canvas() {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="w-screen">
      <DrawingBoard />
    </div>
  );
}
