"use client";
import React, { useCallback, useEffect, useState } from "react";
import ArtComponent from "./ArtComponent";
import axios from "axios";
import { Ring } from "@uiball/loaders";

export default function RenderArts() {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllArts = useCallback(async () => {
    setLoading(true);
    const response = await axios.get("/api/art");

    setArts(response.data);
    setLoading(false);
  }, [setArts]);

  useEffect(() => {
    getAllArts();
  }, [getAllArts]);

  if (loading) {
    return <div className="flex items-center justify-center">
    <Ring color="#fff" />
    </div>;

  }

  return (
    <div className="">
      {arts.map((art, idx) => (
        <ArtComponent key={idx} userArt={art} />
      ))}
    </div>
  );
}
