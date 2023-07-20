"use client";
import React, { useCallback, useEffect, useState } from "react";
import ArtComponent from "./ArtComponent";
import axios from "axios";
import ButtonLoader from "./ButtonLoader";
import Loader from "./Loader";


export default function RenderArts() {
  const [arts, setArts] = useState([]);

 const getAllArts = useCallback(async () => {
    const response = await axios.get("/api/art");
    console.log(response.data)
    setArts(response.data);
 }, [setArts]);

  useEffect(() => {
    getAllArts();
  }, [getAllArts]);


  return (
    <div>
      {arts.map((art,idx) => (
        <ArtComponent key={idx} userArt={art} />
      ))}
    </div>
  );
}
