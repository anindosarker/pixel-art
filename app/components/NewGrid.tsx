import React from "react";

export default function NewGrid() {
  return (
    <div className="h-70vh">
      <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-64 gap-2">
          {/* Generate the grid cells */}
          {Array.from({ length: 64 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 h-8 w-8 flex justify-center items-center"
            >
              {/* You can add content or customize each grid cell here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
