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

  return (
    <div
      className="flex w-2/3 flex-col items-center justify-center gap-8"
      ref={parentRef}
    >
      <div className="flex-col items-center justify-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <Waveform color="#fff" />
          </div>
        ) : arts.length !== 0 ? (
          arts?.map((art, index) => (
            <Reviews
              key={index}
              data={art}
              setLoading={setLoading}
              selectedTab={selectedTab}
              setArts={setArts}
            />
          ))
        ) : (
          <div>No art found</div>
        )}
      </div>
    </div>
  );
}
