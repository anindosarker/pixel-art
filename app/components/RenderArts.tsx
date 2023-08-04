"use client";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Ring, Waveform } from "@uiball/loaders";
import Reviews from "./Reviews";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { fetchArts } from "../action/fetchAction";

interface RenderArtsProps {
  fetch: any;
}

export default function RenderArts({ fetch }: RenderArtsProps) {
  const [options] = useState(["Time Uploaded", "Rating"]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const parentRef = useRef(null);

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
    fetchArts(setLoading, selectedTab, setArts);
    if (fetch) fetchArts(setLoading, selectedTab, setArts);
  }, [selectedTab, fetch]);

  return (
    <div className="flex flex-col gap-8 w-2/3 items-center justify-center" ref={parentRef}>
      <div>
        <Tabs className="flex flex-col items-center justify-center">
          <TabList>
            {options.map((option, index) => (
              <Tab key={index} onClick={() => setSelectedTab(index)}>
                Sorted by {option}
              </Tab>
            ))}
          </TabList>
          {options.map((option, index) => (
            <TabPanel key={index}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <Waveform color="#fff" />
                </div>
              ) : (
                arts &&
                arts.map((art, index) => <Reviews key={index} data={art} />)
              )}
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};


