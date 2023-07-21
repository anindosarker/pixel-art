"use client";
import React, { useCallback, useEffect, useState } from "react";
import ArtComponent from "./ArtComponent";
import axios from "axios";
import { Ring } from "@uiball/loaders";
import Reviews from "./Reviews";
import { Database } from "@/lib/database.types";

export default function RenderArts() {
  const [arts, setArts] = useState<
    Database["public"]["Tables"]["arts"]["Row"] | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllArts2();
  }, []);

  async function getAllArts2() {
    setLoading(true);
    const response = await fetch("/api/arts").then((res) => res.json());
    console.log(
      "👉️ ~ file: RenderArts.tsx:30 ~ getAllArts2 ~ response:\n",
      response
    );

    setArts(response.data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Ring color="#fff" />
      </div>
    );
  }

  return (
    <div className="">
      <Reviews data={arts} />
    </div>
  );
}
