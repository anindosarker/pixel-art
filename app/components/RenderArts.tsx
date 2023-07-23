"use client";
import { Database } from "@/lib/database.types";
import autoAnimate from "@formkit/auto-animate";
import { Ring } from "@uiball/loaders";
import { useEffect, useRef, useState } from "react";
import Reviews from "./Reviews";

export default function RenderArts() {
  const [arts, setArts] = useState<
    {
      art_array: JSON[];
      avg_rating: number | null;
      created_at: string | null;
      id: number;
      image_url: string | null;
      user_id: {
        email: string | null;
      };
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    const getAllArts = async () => {
      setLoading(true);
      const response = await fetch("/api/arts").then((res) => res.json());

      setArts(response);
      setLoading(false);
    };

    parent.current && autoAnimate(parent.current);
    getAllArts();
  }, [parent]);

  // async function getAllArts() {
  //   setLoading(true);
  //   const response = await fetch("/api/arts").then((res) => res.json());

  //   setArts(response);
  //   setLoading(false);
  // }

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
