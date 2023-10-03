import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Waveform } from "@uiball/loaders";
import Reviews from "./Reviews";
import "react-tabs/style/react-tabs.css";
import { fetchArts } from "../action/fetchAction";

interface RenderArtsProps {
  arts: any;
  setArts: any;
  fetch: any;
}

export default function RenderArts({ arts, setArts, fetch }: RenderArtsProps) {
  const [options] = useState(["Time Uploaded", "Rating"]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const parentRef = useRef(null);

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
    fetchArts(setLoading, selectedTab, setArts, currentPage, itemsPerPage); 
    if (fetch) {
      console.log("inside fetch")
      fetchArts(setLoading, selectedTab, setArts, 1, itemsPerPage); 
    }
  }, [selectedTab, fetch, currentPage, setArts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        currentPage < Math.ceil(arts.length / itemsPerPage)
      ) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, arts, loading]);

  if (loading && currentPage === 1) {
    return (
      <div className="">
        <Waveform color="#fff" />
      </div>
    );
  }

  return (
    <div className="w-2/3" ref={parentRef}>
      <div className="-mx-4 flex flex-wrap items-center">
        {arts.length !== 0 ? (
          arts.slice(0, currentPage * itemsPerPage).map((art:any, index:number) => (
            <div key={index} className="mb-4 w-1/3 px-4">
              <Reviews
                data={art}
                setLoading={setLoading}
                selectedTab={selectedTab}
                setArts={setArts}
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center">No art found</div>
        )}
      </div>
    </div>
  );
}
