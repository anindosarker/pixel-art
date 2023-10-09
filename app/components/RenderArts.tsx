import { useEffect, useRef, useState } from "react";
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
  const [selectedTab, setSelectedTab] = useState("timeD");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
    fetchArts(setLoading, selectedTab, setArts, 1, itemsPerPage);
  }, [selectedTab, fetch, setArts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        currentPage < Math.ceil(arts.length / itemsPerPage)
      ) {
        console.log("fetching arts")
        
        setCurrentPage(currentPage + 1);
      }
    };
   
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, arts, loading]);

  const handleTabClick = (tab: string) => {
    if (selectedTab !== tab) {
      setSelectedTab(tab);
    }
  };

  const filteredArts = () => {
    let sortedArts = [...arts];

    if (selectedTab === "timeA") {
      sortedArts.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    } else if (selectedTab === "timeD") {
      sortedArts.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else if (selectedTab === "price") {
      sortedArts.sort((a, b) => a.price - b.price);
    }

    return sortedArts.slice(0, currentPage * itemsPerPage);
  };

  if (loading && currentPage === 1) {
    return (
      <div className="">
        <Waveform color="#fff" />
      </div>
    );
  }

  return (
    <div className="w-2/3">
      <div className="">
        <div className="flex space-x-4 mb-10">
          <CustomTab
            label="Latest"
            onClick={() => handleTabClick("timeD")}
            selected={selectedTab === "timeD"}
          />
          <CustomTab
            label="Oldest"
            onClick={() => handleTabClick("timeA")}
            selected={selectedTab === "timeA"}
          />
          <CustomTab
            label="Price"
            onClick={() => handleTabClick("price")}
            selected={selectedTab === "price"}
          />
        </div>
      </div>
      <div className="-mx-4 flex flex-wrap items-center">
        {filteredArts().length !== 0 ? (
          filteredArts().map((art: any, index: number) => (
            <div
              key={index}
              className="mb-4 w-full h-full px-4 sm:w-1/2 md:w-1/3 lg:w-1/3"
            >
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


function CustomTab({ label, onClick, selected }: any) {
  return (
    <div
      className={`cursor-pointer rounded-lg px-4 py-2 ${
        selected ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}