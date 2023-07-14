import React, { useState } from "react";
import ColorSelection from "./ColorSelection";

interface DivColor {
  row: number;
  col: number;
  color: string;
}

export default function DrawingBoard() {
  const [selectedColor, setSelectedColor] = useState("");
  const gridSize: number = 10;
  const [selectedDivs, setSelectedDivs] = useState<DivColor[]>([]);

  const handleDivClick = (row: number, col: number) => {
    const existingDiv = selectedDivs.find(
      (div) => div.row === row && div.col === col
    );

    if (existingDiv && existingDiv.color === selectedColor) {
      return;
    }

    const newSelectedDivs = selectedDivs.filter(
      (div) => !(div.row === row && div.col === col)
    );
    const newDiv: DivColor = { row, col, color: selectedColor };
    newSelectedDivs.push(newDiv);
    setSelectedDivs(newSelectedDivs);
  };

  const handleFinishClick = () => {
    const coloredDivs = selectedDivs.map((div) => ({
      index: `(${div.row}, ${div.col})`,
      color: div.color,
    }));

    console.log(coloredDivs);
  };

  const gridItems: JSX.Element[] = [];

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const selectedDiv = selectedDivs.find(
        (div) => div.row === row && div.col === col
      );
      const divStyle: React.CSSProperties = {
        backgroundColor: selectedDiv ? selectedDiv.color : "white",
      };

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
      <ColorSelection setSelectedColor={setSelectedColor} />
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
