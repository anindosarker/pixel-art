"use client";
import { Database } from "@/lib/database.types";
import autoAnimate from "@formkit/auto-animate";
import { Ring } from "@uiball/loaders";
import { useEffect, useRef, useState } from "react";
import Reviews from "./Reviews";

export default function RenderArts() {
  const [arts, setArts] = useState<
    Database["public"]["Tables"]["arts"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    getAllArts();
  }, [parent]);

  async function getAllArts() {
    setLoading(true);
    const response = await fetch("/api/arts").then((res) => res.json());

    setArts(response);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center" ref={parent}>
        <Ring color="#fff" />
      </div>
    );
  }

  return (
    <div className="" ref={parent}>
      {arts &&
        arts.map((art) => {
          return <Reviews key={art.id} data={art} />;
        })}
    </div>
  );
}
