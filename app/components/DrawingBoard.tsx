"use client";
import ColorSelection from "./ColorSelection";
import { useState } from "react";

interface DivColor {
  row: number;
  col: number;
  color: string;
}

export default function DrawingBoard() {
  const [selectedColor, setSelectedColor] = useState("");
  const gridSize: number = 64;
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
    const coloredDivs = selectedDivs
      .filter((div) => div.color)
      .map((div) => ({
        index: `(${div.row}, ${div.col})`,
        color: div.color,
      }));
    console.log(coloredDivs);
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        const existingDiv = selectedDivs.find(
          (div) => div.row === i && div.col === j
        );
        const backgroundColor = existingDiv ? existingDiv.color : "white";
        row.push(
          <div
            key={`${i}-${j}`}
            onClick={() => handleDivClick(i, j)}
            style={{
              backgroundColor,
              width: "10px",
              height: "10px",
              border: "1px solid black",
              display: "inline-block",
              margin: 0,
              padding: 0,
            }}
          />
        );
      }
      grid.push(
        <div key={i} style={{ lineHeight: 0 }}>
          {row}
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>{grid}</div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ColorSelection setSelectedColor={setSelectedColor} />
      {renderGrid()}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleFinishClick}
      >
        Finish
      </button>
    </div>
  );
}
