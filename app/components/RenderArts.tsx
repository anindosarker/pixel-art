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
  const [fetchLoader, setFetchLoader] = useState(false);
  const itemsPerPage = 5;
  const prevPageRef = useRef(1);

  useEffect(() => {
    setCurrentPage(1);
    prevPageRef.current = 1;
    fetchArts(setLoading, selectedTab, setArts, 1, itemsPerPage);
  }, [selectedTab, fetch, setArts]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        arts.length >= prevPageRef.current * itemsPerPage
      ) {
        setFetchLoader(true); 
        setCurrentPage((prevPage) => prevPage + 1);
        prevPageRef.current += 1;
        fetchArts(
          setLoading,
          selectedTab,
          setArts,
          prevPageRef.current,
          itemsPerPage,
        ).then(() => {
          setFetchLoader(false);
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [arts, loading, selectedTab, setArts]);


  const fetchFirstPage = () => {
    setCurrentPage(1);
    fetchArts(setLoading, selectedTab, setArts, 1, itemsPerPage);
  };

  const handleTabClick = (tab: string) => {
    if (selectedTab !== tab) {
      setSelectedTab(tab);
      fetchFirstPage();
    } 
    if (selectedTab === tab) {
      setSelectedTab("timeA")
      fetchFirstPage();
    }
  };

  const handlePriceTabClick = (tab: string) => {
    console.log(selectedTab)
    if (selectedTab !== tab) {
      setSelectedTab(tab);
      fetchFirstPage();
    }
    if (selectedTab === tab) {
      setSelectedTab("priceD")
      fetchFirstPage();
    }
  }

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
    } else if (selectedTab === "priceD") {
      sortedArts.sort((a, b) => b.price - a.price);
    }

    return sortedArts.slice(0, currentPage * itemsPerPage);
  };

  const handleLoader = () => {
    setLoading(true);
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
        <div className="mb-10 flex space-x-4">
          <CustomTab
            label={
              selectedTab === "timeA"
                ? "Oldest"
                : "Most Recent"
            }
            onClick={() => {
              if (selectedTab === "timeA") {
                handleTabClick("timeD");
              } else {
                handleTabClick("timeA");
              }
            }}
            selected={selectedTab === "timeD" || selectedTab === "timeA"}
          />
          <CustomTab
            label={
              selectedTab === "price"
                ? "Price(Low-High)"
                : "Price(High-Low)"
            }
            onClick={() => {
              if (selectedTab === "price") {
                handlePriceTabClick("priceD");
              } else {
                handlePriceTabClick("price");
              }
            }}
            selected={selectedTab === "price" || selectedTab === "priceD"}
          />
          <CustomTab
          label="Volume"
          onClick={() => {}}
          selected={false}
          />
        </div>
      </div>
      <div className="-mx-4 flex flex-wrap items-center">
        {filteredArts().length !== 0 ? (
          filteredArts().map((art: any, index: number) => (
            <div
              key={index}
              className="mb-4 h-full w-full px-4 sm:w-1/2 md:w-1/3 lg:w-1/3"
            >
              <Reviews
                data={art}
                setLoading={handleLoader}
                selectedTab={selectedTab}
                setArts={setArts}
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center">No art found</div>
        )}
      </div>
      {fetchLoader && (
        <div className="flex items-center justify-center">
          <Waveform color="#fff" />
        </div>
      )}
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
