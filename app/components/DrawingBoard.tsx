"use client";
import React, { useState, useRef, useEffect } from "react";
import ColorSelection from "./ColorSelection";
import html2canvas from "html2canvas";
import ButtonLoader from "./ButtonLoader";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.types";
import { toast } from "react-hot-toast";
import { v4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface DivColor {
  row: number;
  col: number;
  color: string;
}

export default function DrawingBoard() {
  const router = useRouter();
  const [artSubmitting, setArtSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [artExistsMsg, setArtExistsMsg] = useState("");
  const gridSize: number = 64;
  const [selectedDivs, setSelectedDivs] = useState<DivColor[]>([]);
  const isMouseDown = useRef(false);
  const previousDiv = useRef<DivColor | null>(null);

  const supabase = createClientComponentClient<Database>();

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
    let imageFile;
    if (board) {
      html2canvas(board).then((canvas) => {
        imageFile = canvas.toDataURL("image/png");
      });
    }

    const url = await handleUpload(imageFile!);

    const data = {
      art_array: coloredDivs,
      image_url: url,
    };
    console.log(
      "👉️ ~ file: DrawingBoard.tsx:118 ~ handleFinishClick ~ data:\n",
      data
    );

    setArtSubmitting(true);
    const response = await fetch("/api/arts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    console.log(
      "👉️ ~ file: DrawingBoard.tsx:129 ~ handleFinishClick ~ response:\n",
      response
    );
  };

  async function handleUpload(image: File) {
    let notification = toast.loading("Uploading Product...");
    const file = image;
    const fileName = `${v4()}.${image?.name.split(".").pop()}`;
    const filePath = `${fileName}`;

    const { data: imageUploadData, error: imageUploadError } =
      await supabase.storage.from("images").upload(filePath, file!);

    if (imageUploadError) {
      console.log(
        "🚀 ~ file: NewCreation.tsx:59 ~ handleFileUpload ~ imageUploadError:\n",
        imageUploadError
      );
      toast.error("Image Upload error!", { id: notification });
    }
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageUploadData?.path}`;
    toast.success("Product Uploaded!", { id: notification });
    return url;
  }

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
    <div className="flex flex-col items-center justify-between">
      <div className="flex w-full justify-center gap-x-12">
        <ColorSelection setSelectedColor={setSelectedColor} />
        <div className="" id="drawing-board">
          {renderGrid()}
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleFinishClick}
      >
        {artSubmitting ? <ButtonLoader /> : "Finish"}
      </button>
      <div className="text-red-500">{artExistsMsg}</div>
    </div>
  );
}
