"use client";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Waveform } from "@uiball/loaders";
import Reviews from "./Reviews";
import "react-tabs/style/react-tabs.css";
import { fetchArts } from "../action/fetchAction";

interface RenderArtsProps {
  fetch: any;
}

export default function RenderArts({ fetch }: RenderArtsProps) {
  const [options] = useState(["Time Uploaded", "Rating"]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const parentRef = useRef(null);

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
    fetchArts(setLoading, selectedTab, setArts);
    if (fetch) fetchArts(setLoading, selectedTab, setArts);
  }, [selectedTab, fetch]);

  if (loading) {
    return (
      <div className="">
        <Waveform color="#fff" />
      </div>
    )
  }

return (
  <div className="w-2/3" ref={parentRef}>
    <div className="-mx-4 flex flex-wrap items-center">
      {arts.length !== 0 ? (
        arts.map((art, index) => (
          <div key={index} className="mb-4 w-1/3 px-4">
            <Reviews
              data={art}
              setLoading={setLoading}
              selectedTab={selectedTab}
              setArts={setArts}
            />
          </div>
        ))
      ) : (
        <div className="w-full text-center">No art found</div>
      )}
    </div>
  </div>
);
}
