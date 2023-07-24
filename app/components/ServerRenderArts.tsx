import React from "react";
import { getArts } from "../actions/getArts";
import Reviews from "./Reviews";

export default async function ServerRenderArts() {
  const arts = await getArts();
  
  return (
    <div>
      {Array.isArray(arts) &&
        arts.map((art: any) => {
          return <Reviews key={art.id} data={art} />;
        })}
    </div>
  );
}
