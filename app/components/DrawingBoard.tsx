"use client";
import domtoimage from "dom-to-image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 } from "uuid";
import ColorSelection from "./ColorSelection";
import { supabase } from "@/lib/supabase";

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
  const gridSize: number = 32;
  const [selectedDivs, setSelectedDivs] = useState<DivColor[]>([]);
  const isMouseDown = useRef(false);
  const previousDiv = useRef<DivColor | null>(null);

  let notification: string;

  const handleDivClick = (row: number, col: number) => {
    if (!selectedColor) {
      toast.error("Please select a color!", { id: notification });
    }
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
    if (selectedDivs.length === 0) {
      toast.error("Please select some colors!");
      return;
    }
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

    let node = document.getElementById("drawing-board");
    let imageFile;
    let url: string;
    domtoimage
      //@ts-ignore
      .toBlob(node)
      .then(async function (blob) {
        // use this blob file and make it a png image
        imageFile = new File([blob], "image.png", { type: "image/png" });
        url = await handleUpload(imageFile);
      })
      .then(async () => {
        // TODO: upload image to supabase storage, and add new Art to supabase database

        const data = {
          art_array: coloredDivs,
          image_url: url,
        };

        const response = await fetch("/api/arts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            toast.success("Art uploaded! 😀", { id: notification });

            return res.json();
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: NewCreation.tsx:202 ~ handleFinishClick ~ err:\n",
              err
            );
            setArtExistsMsg("Art already exists!");
            toast.error(`Duplicate art!`, { id: notification });
          });
        setArtSubmitting(false);
        setSelectedDivs([]);
        router.refresh();
      });
  };

  async function handleUpload(image: File) {
    notification = toast.loading("Uploading Art...");
    const file = image;
    const fileName = `${v4()}.png`;
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
              width: "20px",
              height: "20px",
              border: "1px solid gray",
              display: "inline-block",
              margin: 0,
              padding: 0,
            }}
            className="rounded-sm"
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
      <div className="flex flex-col sm:flex-row w-full justify-center gap-x-12">
        <ColorSelection setSelectedColor={setSelectedColor} />
        <div className="" id="drawing-board">
          {renderGrid()}
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleFinishClick}
      >
        Upload
      </button>
      <div className="text-red-500">{artExistsMsg}</div>
    </div>
  );
}
