'use client';
import React, { useState } from "react";
import DrawingBoard from "./DrawingBoard";
import ColorSelection from "./ColorSelection";

export default function Canvas() {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <ColorSelection />
      <DrawingBoard />
    </div>
  );
}
