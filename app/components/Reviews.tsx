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
import ReactAudioPlayer from "react-audio-player";

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
    username: string | null;
    id: number;
    image_url: string | null;
    audio_url: string | undefined;
    user_img: string | null;
    audio_name: string | null;
    price: number | null;
    percentage: number | null;
    royalty: number | null;
    nft: boolean | null;
    genre: string | null;
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


 return (
   <article className="mb-5 max-h-[1/3] rounded-xl border border-white bg-black p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
     <div className="flex flex-col items-start sm:gap-8">
       <div className="flex gap-2">
         {data?.user_img ? (
           <div className="">
             <img
               src={data?.user_img}
               alt="usr"
               width={25}
               height={20}
               className="h-full rounded-full object-cover"
             />
           </div>
         ) : (
           <div className="">
             <img
               src="/images/user.jpeg"
               alt="usr"
               width={25}
               height={20}
               className="h-full rounded-full object-cover"
             />
           </div>
         )}
         <p className="hover:underline">
           <span className="font-semibold">
             {data?.username || "Anonymous"}
           </span>
         </p>
       </div>
       <div className="">
         <img
           src={data?.image_url || "/images/art (3).png"}
           alt="art"
           width={300}
           height={300}
           className="rounded-md object-cover"
         />
       </div>

       <div className="flex w-full flex-col">
         <div className="text-sm"></div>
         <div className="mt-4 flex flex-col items-start justify-center gap-2 text-sm">
           <p>Genre: {data?.genre || "Not specified"}</p>
           <p>Audio: {data?.audio_name || "No audio"}</p>
           <p>1 of {data?.nft} nfts</p>
           <p>{data?.price} OMP3</p>
         </div>

         <div className="mt-10">
           {data?.audio_name && (
             <ReactAudioPlayer
               src={data?.audio_url}
               controls
               className="w-full"
             />
           )}
         </div>
         <div className="py-2 sm:flex sm:items-center sm:gap-2">
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
               {formatDistanceToNow(new Date(data?.created_at || Date.now()))}{" "}
               ago
             </p>
           </div>
         </div>
         <button className="mt-6 w-full rounded-lg bg-[#fff] px-4 py-2 font-bold text-black hover:bg-[#413f3f] hover:text-white">
           BUY
         </button>
       </div>
     </div>
   </article>
 );
}

