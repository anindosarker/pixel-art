'use client'
import React, { useState } from "react";
import ColorSelection from "./ColorSelection";

export default function DrawingBoard() {
  const gridSize: number = 10;
  const [selectedDivs, setSelectedDivs] = useState<
    { row: number; col: number }[]
  >([]);

  const handleDivClick = (row: number, col: number) => {
    const newSelectedDivs = [...selectedDivs, { row, col }];
    setSelectedDivs(newSelectedDivs);
  };

  const handleFinishClick = () => {
    const coloredIndexes = selectedDivs.map(
      (div) => `(${div.row}, ${div.col})`
    );
    console.log(coloredIndexes);
  };

  const gridItems: JSX.Element[] = [];

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isSelected: boolean = selectedDivs.some(
        (div) => div.row === row && div.col === col
      );
      const divStyle: React.CSSProperties = isSelected
        ? { backgroundColor: "red" }
        : {};

      gridItems.push(
        <div
          key={`${row}-${col}`}
          className="h-16 w-16 bg-white border border-black"
          style={divStyle}
          onClick={() => handleDivClick(row, col)}
        ></div>
      );
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mx-auto bg-white rounded-lg shadow-md">
        <div className={`grid grid-cols-${gridSize} grid-rows-${gridSize}`}>
          {gridItems}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleFinishClick}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
