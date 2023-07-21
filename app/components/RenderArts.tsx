"use client";
import { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import Reviews from "./Reviews";
import { Database } from "@/lib/database.types";

export default function RenderArts() {
  const [arts, setArts] = useState<
    Database["public"]["Tables"]["arts"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);
  console.log("👉️ ~ file: RenderArts.tsx:9 ~ RenderArts ~ arts:\n", arts);

  useEffect(() => {
    getAllArts();
  }, []);

  async function getAllArts() {
    setLoading(true);
    const response = await fetch("/api/arts").then((res) => res.json());
    console.log(
      "👉️ ~ file: RenderArts.tsx:30 ~ getAllArts2 ~ response:\n",
      response
    );

    setArts(response);
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
      {arts &&
        arts.map((art) => {
          return <Reviews key={art.id} data={art} />;
        })}
    </div>
  );
}
