"use client";
import { Database } from "@/lib/database.types";
import { Ring } from "@uiball/loaders";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";

export default function RenderArts() {
  const [arts, setArts] = useState<
    Database["public"]["Tables"]["arts"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllArts();
  }, []);

  async function getAllArts() {
    setLoading(true);
    const response = await fetch("/api/arts").then((res) => res.json());

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
