"use client";
import React, { useState, useRef, useEffect } from "react";
import ColorSelection from "./ColorSelection";
import axios from "axios";
import html2canvas from "html2canvas";
import { useSession } from "next-auth/react";

interface DivColor {
  row: number;
  col: number;
  color: string;
}

export default function DrawingBoard() {
  const [selectedColor, setSelectedColor] = useState("");
  const [artExistsMsg, setArtExistsMsg] = useState("");
  const gridSize: number = 64;
  const [selectedDivs, setSelectedDivs] = useState<DivColor[]>([]);
  const isMouseDown = useRef(false);
  const previousDiv = useRef<DivColor | null>(null);
  const { data: session } = useSession();

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

    coloredDivs.sort((a, b) => a.row - b.row);
    coloredDivs.sort((a, b) => a.col - b.col);

    console.log(coloredDivs);

    const board = document.getElementById("drawing-board");
    if (board) {
      html2canvas(board).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        const currentDateTime = new Date().toISOString().replace(/[-:.]/g, "");
        const randomImageName = `${currentDateTime}-${
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        }.png`;
        link.download = randomImageName;
        link.href = dataUrl;
        // link.click();
      });
    }

    const data = { coloredDivs, email: session?.user?.email };
    axios
      .post("/api/createArt", data)
      .then((response) => {
        console.log(response);
        setSelectedDivs([]);
        setArtExistsMsg("");
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.status === 400) {
          setArtExistsMsg("Art already exists");
        }
      });
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        const existingDiv = selectedDivs.find(
          (div) => div.row === i && div.col === j
        );
        const backgroundColor = existingDiv ? existingDiv.color : "black";
        row.push(
          <div
            key={`${i}-${j}`}
            onMouseEnter={() => handleDivEnter(i, j)}
            onClick={() => handleDivClick(i, j)}
            style={{
              backgroundColor,
              width: "10px",
              height: "10px",
              border: "1px solid white",
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
      <div className="flex flex-row items-center">
        <ColorSelection setSelectedColor={setSelectedColor} />
        <div className="" id="drawing-board">
          {renderGrid()}
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleFinishClick}
      >
        Finish
      </button>
      <div className="text-red-500">{artExistsMsg}</div>
    </div>
  );
}
