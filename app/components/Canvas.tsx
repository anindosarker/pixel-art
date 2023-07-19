"use client";
import React, { useState } from "react";
import DrawingBoard from "./DrawingBoard";
import ColorSelection from "./ColorSelection";
import { SessionProvider } from "next-auth/react";

export default function Canvas() {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="">
      <SessionProvider>
        <DrawingBoard />
      </SessionProvider>
    </div>
  );
}
