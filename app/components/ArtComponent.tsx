"use client";
import React from "react";
import Image from "next/image";
import artImg from "../../public/images/art (3).png";
import axios from "axios";

interface ArtComponentProps {
  userArt: any;
}

export default function ArtComponent({ userArt }: ArtComponentProps) {
  // const grid = [];

  // for (let i = 0; i < 64; i++) {
  //   const row: any = [];
  //   for (let j = 0; j < 64; j++) {
  //     // row.push(
  //     //   <div
  //     //     key={`${i}-${j}`}
  //     //     className="w-2 h-2 bg-black border border-white"
  //     //   ></div>
  //     // );
  //     const cellColor = userArt.userArt.find(
  //       (cell: any) => cell.row === i && cell.col === j
  //     )?.color;
  //     row.push(
  //       <div
  //         key={`${i}-${j}`}
  //         className="w-1 h-1 border-white"
  //         style={{ backgroundColor: cellColor }}
  //       ></div>
  //     );
  //   }

  //   grid.push(
  //     <div key={i} className="flex">
  //       {row}
  //     </div>
  //   );
  // }

  return (
    <article className="rounded-xl bg-black border border-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 mb-5">
      <div className="flex items-start sm:gap-8">
        <div className="">
          <Image
            src={userArt.image_url}
            alt=""
            width={300}
            height={300}
            className="object-cover rounded-md"
          />
          {/* {grid} */}
        </div>

        <div>
          <h3 className="mt-4 text-lg font-medium sm:text-xl">
            <a href="" className="hover:underline">
              {" "}
              Username
            </a>
          </h3>

          <p className="mt-1 text-sm text-white">
            review section Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Minima quasi exercitationem magnam velit ut ipsa suscipit
            repellat amet in beatae!
          </p>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
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

              <p className="text-sm font-medium">{userArt.created_at}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
