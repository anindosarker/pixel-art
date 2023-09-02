"use client";
import domtoimage from "dom-to-image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 } from "uuid";
import ColorSelection from "./ColorSelection";
import { supabase } from "@/lib/supabase";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
// import handleAudioUpload from "../action/audioUpload";

interface DivColor {
  row: number;
  col: number;
  color: string;
}

interface DrawingBoardProps {
  setFetch: any;
}

export default function DrawingBoard({ setFetch }: DrawingBoardProps) {
  const router = useRouter();
  // const [artSubmitting, setArtSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [artExistsMsg, setArtExistsMsg] = useState("");
  const [duplicateArt, setDuplicateArt] = useState(false);
  const gridSize: number = 32;
  const [selectedDivs, setSelectedDivs] = useState<DivColor[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [nft, setNft] = useState(0);
  const [price, setPrice] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const isMouseDown = useRef(false);
  const previousDiv = useRef<DivColor | null>(null);

  let notification: string;

  // const handleDivClick = (row: number, col: number) => {
  //   if (!selectedColor) {
  //     toast.error("Please select a color!", { id: notification });
  //   }

  //   const existingDiv = selectedDivs.find(
  //     (div) => div.row === row && div.col === col
  //   );

  //   if (existingDiv && existingDiv.color === selectedColor) {
  //     return;
  //   }

  //   const newSelectedDivs = selectedDivs.filter(
  //     (div) => !(div.row === row && div.col === col)
  //   );
  //   const newDiv: DivColor = { row, col, color: selectedColor };
  //   newSelectedDivs.push(newDiv);
  //   setSelectedDivs(newSelectedDivs);
  // };

  // maruf
  const handleDivClick = (row: number, col: number) => {
    if (!selectedColor) {
      toast.error("Please select a color!", { id: notification });
      return;
    }

    if (selectedColor === "#000000") {
      const newSelectedDivs = selectedDivs.filter(
        (div) => !(div.row === row && div.col === col),
      );
      setSelectedDivs(newSelectedDivs);
      return;
    }

    const existingDiv = selectedDivs.find(
      (div) => div.row === row && div.col === col,
    );

    if (existingDiv && existingDiv.color === selectedColor) {
      return;
    }

    const newSelectedDivs = selectedDivs.filter(
      (div) => !(div.row === row && div.col === col),
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
      .reduce((acc: Record<string, string[]>, div) => {
        if (!acc[div.color]) {
          acc[div.color] = [];
        }
        acc[div.color].push(`${div.row}${div.col}`);
        return acc;
      }, {});

    // Sort the indexes for each color
    for (const color in coloredDivs) {
      coloredDivs[color].sort();
    }

    const coloredDivsString = Object.entries(coloredDivs)
      .map(
        ([color, indexes]: [string, string[]]) => `${color}${indexes.join("")}`,
      )
      .join("");

    // console.log(coloredDivsString);

    let node = document.getElementById("drawing-board");
    let imageFile;
    let url: string;
    let audio_url: string;
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
        audio_url = await handleAudioUpload(audioFile!);
        const data = {
          art_array: coloredDivsString,
          image_url: url,
          audio_url: audio_url,
          audio_name: audioFile?.name,
          nft: nft,
          price: price,
          percentage: percentage,
          royalty: royalty,
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
              err,
            );
            setDuplicateArt(true);
            setArtExistsMsg("Art already exists!");
            toast.error(`Duplicate art!`, { id: notification });
          });
        setFetch(true);
        setSelectedDivs([]);
        setAudioFile(null);
        setNft(0);
        setPrice(0);
        setPercentage(0);
        setRoyalty(0);

        router.refresh();
      });
    setFetch(false);
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
        imageUploadError,
      );
      toast.error("Image Upload error!", { id: notification });
    }
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageUploadData?.path}`;
    toast.success("Art uploaded successfully!", { id: notification });
    return url;
  }

  async function handleAudioUpload(audio: File) {
    notification = toast.loading("Uploading Audio...");
    const file = audio;
    const fileName = `${v4()}.mp3`;
    const filePath = `${fileName}`;

    const { data: audioUploadData, error: audioUploadError } =
      await supabase.storage.from("audio").upload(filePath, file!);

    if (audioUploadError) {
      console.log(
        "🚀 ~ file: audioUpload.ts ~ handleUpload ~ audioUploadError:\n",
        audioUploadError,
      );
      toast.error("Audio Upload error!", { id: notification });
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audio/${audioUploadData?.path}`;
    toast.success("Audio uploaded successfully!", { id: notification });
    return url;
  }

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        const existingDiv = selectedDivs.find(
          (div) => div.row === i && div.col === j,
        );
        const backgroundColor = existingDiv ? existingDiv.color : "#000000";
        row.push(
          <div
            key={`${i}-${j}`}
            onMouseEnter={() => handleDivEnter(i, j)}
            onClick={() => handleDivClick(i, j)}
            style={{
              backgroundColor: backgroundColor ? backgroundColor : "#000000",
            }}
            className="m-0 inline-block h-3 w-3 rounded-sm border border-gray-400 p-0 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-4 lg:w-4"
          />,
        );
      }
      grid.push(
        <div key={i} className="flex flex-row" style={{ lineHeight: 0 }}>
          {row}
        </div>,
      );
    }
    return <div className="flex flex-col">{grid}</div>;
  };

  return (
    <div className="flex flex-col items-center justify-between px-4">
      <div className="flex flex-col justify-between p-6 sm:flex-row sm:justify-center sm:gap-x-12">
        <ColorSelection setSelectedColor={setSelectedColor} />
        <div className="" id="drawing-board">
          {renderGrid()}
        </div>
      </div>
      <div className="mt-8 text-center">
        <label className="block text-lg font-medium text-white">
          <BsPlusCircleFill className="inline-block mr-2 cursor-pointer" />
          Upload MP3 file
          <input
            type="file"
            accept="audio/mp3"
            onChange={(e) => {
              setAudioFile(e.target.files![0]);
            }}
            className="hidden"
          />
        </label>
        {audioFile && <p className="mt-2 text-gray-400">{audioFile.name}</p>}
      </div>
      <div className="mt-5 font-bold">
        How many nfts do you want to mint?
        <label htmlFor="nfts" className="block text-xs font-medium"></label>
        <input
          type="number"
          placeholder=""
          className="mt-1 w-full rounded-md text-black shadow-sm sm:text-sm"
          onChange={(e) => {
            setNft(parseInt(e.target.value));
          }}
          value={nft}
        />
      </div>
      <div className="mt-5 font-bold">
        Price in $OMP3?
        <label htmlFor="nfts" className="block text-xs font-medium"></label>
        <input
          type="number"
          placeholder=""
          className="mt-1 w-full rounded-md text-black shadow-sm sm:text-sm"
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
          }}
          value={price}
        />
      </div>
      <p className="mt-5 font-bold">How much percentage do you want to give?</p>

      <Slider
        min={0}
        max={100}
        defaultValue={0}
        value={percentage}
        onChange={(e) => {
          // @ts-ignore
          setPercentage(e);
        }}
      />
      <p className="font-bold">{percentage}%</p>
      <p className="mt-5 font-bold">
        What royalty pecentage do you want per transaction?
      </p>

      <Slider
        min={0}
        max={10}
        defaultValue={0}
        value={royalty}
        onChange={(e) => {
          // @ts-ignore
          setRoyalty(e);
        }}
      />
      <p className="font-bold">{royalty}%</p>
      <button
        className="mt-4 rounded bg-[#a2cea6ff] px-4 py-2 text-white font-bold hover:bg-[#b5e7b8]"
        onClick={handleFinishClick}
      >
        MINT
      </button>
    </div>
  );
}
