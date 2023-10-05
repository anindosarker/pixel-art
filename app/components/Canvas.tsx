"use client";
import { useState } from "react";
import axios from "axios";
import DrawingBoard from "./DrawingBoard";
import Navbar from "./Navbar";
import RenderArts from "./RenderArts";

export default function Canvas() {
  const [fetch, setFetch] = useState(false);
  const [arts, setArts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/search?query=${searchQuery}`);
      setArts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center gap-12 bg-black p-5">
        <div className="text-3xl font-semibold tracking-widest text-white">
          Welcome to OnlyMP3 <br />
        </div>
        <DrawingBoard setFetch={setFetch} setArts={setArts} />
        <div className="text-3xl font-semibold tracking-widest text-white">
          Art feed
        </div>
        <div className="relative mx-auto pt-2 text-gray-600">
          <input
            className="h-10 rounded-lg border-2 border-gray-300 bg-white px-5 pr-16 text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute right-0 top-0 mr-4 mt-5"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              <svg
                className="h-4 w-4 fill-current text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ background: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            )}
          </button>
        </div>
        <RenderArts arts={arts} setArts={setArts} fetch={fetch} />
      </main>
    </>
  );
}

