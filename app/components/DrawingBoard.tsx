"use client";
import React, { useState, useRef, useEffect } from "react";
import ColorSelection from "./ColorSelection";
import axios from "axios";

interface DivColor {
  row: number;
  col: number;
  color: string;
}

export default function DrawingBoard() {
  const [selectedColor, setSelectedColor] = useState("");
  const gridSize: number = 64;
  const [selectedDivs, setSelectedDivs] = useState<DivColor[]>([]);
  const isMouseDown = useRef(false);
  const previousDiv = useRef<DivColor | null>(null);

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

  const handleDivEnter = (row: number, col: number) => {
    if (isMouseDown.current) {
      if (
        !previousDiv.current ||
        previousDiv.current.row !== row ||
        previousDiv.current.col !== col
      ) {
        handleDivClick(row, col);
      }
    }
  };

  const handleMouseDown = () => {
    isMouseDown.current = true;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    previousDiv.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isMouseDown.current) {
      if (selectedDivs.length > 0) {
        previousDiv.current = selectedDivs[selectedDivs.length - 1];
      } else {
        previousDiv.current = null;
      }
    }
  }, [selectedDivs]);

  const handleFinishClick = async () => {
    const coloredDivs = selectedDivs
      .filter((div) => div.color)
      .map((div) => ({
        row: div.row,
        col: div.col,
        color: div.color,
      }));

    console.log(coloredDivs);
    try {
      const response = await fetch("/api/createArt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coloredDivs),
      })
        .then((res) => {
          console.log(res.json());
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.error(error);
    }
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
            onMouseEnter={() => handleDivEnter(i, j)}
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
            className=""
          />
        );
      }
      grid.push(
        <div key={i} style={{ lineHeight: 0 }}>
          {row}
        </div>
      );
    }
    return <div className="flex flex-col">{grid}</div>;
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
