"use client";
import { useState } from "react";
import DrawingBoard from "./DrawingBoard";
import Navbar from "./Navbar";
import RenderArts from "./RenderArts";

export default function Canvas() {
  const [fetch, setFetch] = useState(false);
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-12 items-center justify-center bg-black p-5">
        <div className="text-3xl font-semibold text-white tracking-widest">
          Welcome to OnlyMP3 <br />
        </div>
        <DrawingBoard setFetch={setFetch} />
        <div className="text-3xl font-semibold text-white tracking-widest">
          Art feed
        </div>
        <RenderArts fetch={fetch}/>
      </main>
    </>
  );
}
