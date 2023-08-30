"use client";
import { Rating } from "@smastrom/react-rating";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchArts } from "../action/fetchAction";

export default function Reviews({
  data,
  setLoading,
  selectedTab,
  setArts,
}: {
  data: {
    art_array: JSON[];
    avg_rating: number | null;
    created_at: string | null;
    id: number;
    image_url: string | null;
    user_id: {
      email: string | null;
    };
  };
  setLoading: any;
  selectedTab: any;
  setArts: any;
}) {
  const router = useRouter();
  const [state, setState] = useState({
    rating: Math.floor(data?.avg_rating as number) || 0,
  });

  const handleRating = async (selectedValue: number) => {
    setState((prev) => ({
      ...prev,
      rating: selectedValue,
    }));
    // console.log(selectedValue);
    const body = {
      rating: selectedValue,
      art_id: data?.id,
      description: "",
    };
    const response = await axios
      .post("/api/review", body)
      .then((res) => {
        toast.success("Review added!");
        router.refresh();
        fetchArts(setLoading, selectedTab, setArts);
      })
      .catch((err) => toast.error("Error adding review!"));
  };

  return (
    <article className="rounded-xl bg-black border border-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 mb-5">
      <div className="flex flex-col items-start sm:gap-8">
        <div className="">
          <Image
            src={data?.image_url || "/images/art (3).png"}
            alt="art"
            width={300}
            height={300}
            className="object-cover rounded-md"
          />
        </div>

        <div>
          <h6 className="text-sm">
            <p className="hover:underline">
              Art by:{" "}
              <span className="font-semibold">
                {data?.user_id?.email?.split("@")[0] || "Random User"}
              </span>
            </p>
            {/* <p>{data?.id}</p> */}
          </h6>

          <div className="text-sm">
            Rating: <span className="font-semibold">{data?.avg_rating}/5</span>
          </div>
          <div className="sm:flex sm:items-center sm:gap-2 py-2">
            <div className="flex items-center gap-1 text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <p className="text-sm font-medium">
                {/* {format(new Date(data?.created_at || Date.now()), "PP")} */}
                {formatDistanceToNow(
                  new Date(data?.created_at || Date.now())
                )}{" "}
                ago
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Rating
              style={{ maxWidth: 250 }}
              value={state.rating}
              onChange={handleRating}
            />
          </div>

          <div className="text-xs py-2">
            Add your review here. (you can only rate once)
          </div>
        </div>
      </div>
    </article>
  );
}
