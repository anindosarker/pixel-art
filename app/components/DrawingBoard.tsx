"use client";
import domtoimage from "dom-to-image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 } from "uuid";
import ColorSelection from "./ColorSelection";
import { supabase } from "@/lib/supabase";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { BsPlusCircleFill, BsX } from "react-icons/bs";
import handleUpload from "../action/imageUpload";
import handleAudioUpload from "../action/audioUpload";
interface DivColor {
  row: number;
  col: number;
  color: string;
}

interface DrawingBoardProps {
  setFetch: any;
  setArts: any;
}

export default function DrawingBoard({ setFetch, setArts }: DrawingBoardProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState("");
  const [artExistsMsg, setArtExistsMsg] = useState("");
  const [duplicateArt, setDuplicateArt] = useState(false);
  const gridSize: number = 32;
  const [selectedDivs, setSelectedDivs] = useState<DivColor[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [userImg, setUserImg] = useState<File | null>(null);
  const [genre, setGenre] = useState("");
  const [nft, setNft] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [percentage, setPercentage] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const [audioName, setAudioName] = useState("");
  const [username, setUsername] = useState("");
  const [isAudioFile, setIsAudioFile] = useState(false);
  const [isaudioFileName, setIsAudioFileName] = useState(false);
  const isMouseDown = useRef(false);
  const previousDiv = useRef<DivColor | null>(null);

  let notification: string;

  const handleDivClick = (row: number, col: number) => {
    if (!selectedColor) {
      toast.error("Please select a color!");
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
    if (!isAudioFile) {
      toast.error("Please upload an audio file!", { id: notification });
      return;
    }
    if (!isaudioFileName) {
      toast.error("Please enter an audio name!", { id: notification });
      return;
    }

    if (selectedDivs.length === 0) {
      toast.error("Please select some colors!", { id: notification });
      return;
    }
    notification = toast.loading("Uploading Art...");

    const coloredDivs = selectedDivs
      .filter((div) => div.color)
      .reduce((acc: Record<string, string[]>, div) => {
        if (!acc[div.color]) {
          acc[div.color] = [];
        }
        acc[div.color].push(`${div.row}${div.col}`);
        return acc;
      }, {});

    for (const color in coloredDivs) {
      coloredDivs[color].sort();
    }

    const coloredDivsString = Object.entries(coloredDivs)
      .map(
        ([color, indexes]: [string, string[]]) => `${color}${indexes.join("")}`,
      )
      .join("");

    const data = {
      art_array: coloredDivsString,
      username: "",
      image_url: "",
      audio_url: "",
      user_img: "",
      audio_name: "",
      genre:"",
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
      .then(async (res) => {
        const newData = await res.json();
        let node = document.getElementById("drawing-board");
        let imageFile;
        let url: string;
        let audio_url: string;
        let user_img: string;
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
            if (userImg)
            user_img = await handleUpload(userImg!);
            const data = {
              ...newData[0],
              username: username,
              image_url: url,
              audio_url: audio_url,
              user_img: user_img,
              audio_name: audioName,
              genre:genre
            };

            const response = await fetch("/api/arts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((res) => {
                toast.success("Finished! 😀", { id: notification });
                // setArts((prev: any) => [data, ...prev]);
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
            // window.location.reload();
            setFetch(true);
            console.log(fetch)
            setSelectedDivs([]);
            setAudioFile(null);
            setUserImg(null);
            setNft(0);
            setPrice(0.0);
            setPercentage(0);
            setRoyalty(0);
            setAudioName("");
            setUsername("");
            setGenre("");
          });
        setFetch(false)
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
      setFetch(false);
      console.log(fetch)
  };

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

      <div className="flex flex-col">
        <div className="p-5 font-bold">
          <label className="mt-2 block text-lg font-medium text-white">
            <BsPlusCircleFill className="mr-2 inline-block cursor-pointer" />
            {audioFile ? audioFile?.name : "Upload MP3 File"}
            <input
              type="file"
              accept="audio/mp3"
              onChange={(e) => {
                setAudioFile(e.target.files![0]);
                setIsAudioFile(true);
              }}
              className="hidden"
            />
          </label>
          <input
            type="text"
            placeholder="enter audio name..."
            className="mt-1 w-full rounded-md p-2 text-black shadow-sm sm:text-sm"
            onChange={(e) => {
              setAudioName(e.target.value);
              if (e.target.value !== "") {
                setIsAudioFileName(true);
              } else {
                setIsAudioFileName(false);
              }
            }}
            value={audioName}
          />
        </div>
        <div className="p-5 font-bold">
          <label htmlFor="username" className="block text-xs font-medium">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Please enter your username..."
            className="mt-1 w-full rounded-md p-2 text-black shadow-sm sm:text-sm"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label className="mt-2 block text-lg font-medium text-white">
            {userImg ? (
              <button
                onClick={() => setUserImg(null)}
                className="inline-block cursor-pointer"
              >
                <BsX className="mr-2" />
              </button>
            ) : (
              <>
                <BsPlusCircleFill className="mr-2 inline-block cursor-pointer" />
                Upload Profile Picture
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg, .webp"
                  onChange={(e) => {
                    setUserImg(e.target.files![0]);
                  }}
                  className="hidden"
                />
              </>
            )}

            {userImg && (
              <Image
                src={URL.createObjectURL(userImg)}
                alt="user"
                className="h-10 w-10 rounded-full object-cover"
                width={10}
                height={10}
              />
            )}
          </label>
        </div>
        <div className="p-5 font-bold">
          <label htmlFor="genre" className="block text-xs font-medium">
            Enter Genre
          </label>
          <input
            type="text"
            placeholder="genre..."
            className="mt-1 w-full rounded-md p-2 text-black shadow-sm sm:text-sm"
            onChange={(e) => {
              setGenre(e.target.value)
            }}
            value={genre}
          />
        </div>
        <div className="p-5 font-bold">
          <label htmlFor="nfts" className="block text-xs font-medium">
            How many nfts do you want to mint?
          </label>
          <input
            type="number"
            placeholder="nft..."
            className="mt-1 w-full rounded-md p-2 text-black shadow-sm sm:text-sm"
            onChange={(e) => {
              setNft(parseInt(e.target.value));
            }}
            value={nft}
          />
        </div>
        <div className="p-5 font-bold">
          <label htmlFor="nfts" className="block text-xs font-medium">
            Price in $OMP3?
          </label>
          <input
            type="number"
            placeholder="price..."
            className="mt-1 w-full rounded-md p-2 text-black shadow-sm sm:text-sm"
            onChange={(e) => {
              setPrice(parseFloat(e.target.value));
            }}
            value={price}
          />
        </div>
        <div className="px-5 py-2">
          <p className="py-4 font-bold">
            How much percentage do you want to give?
          </p>

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
        </div>
        <div className="px-5 py-2">
          <p className="py-4 font-bold">
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
        </div>
      </div>
      <button
        className="mt-4 rounded bg-[#a2cea6ff] px-4 py-2 font-bold text-white hover:bg-[#b5e7b8]"
        onClick={handleFinishClick}
      >
        MINT
      </button>
    </div>
  );
}
