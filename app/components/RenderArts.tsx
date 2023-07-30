"use client";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Ring } from "@uiball/loaders";
import Reviews from "./Reviews";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const RenderArts = () => {
  const [options] = useState(["Time Uploaded", "Rating"]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const parentRef = useRef(null);

  useEffect(() => {
    const fetchArts = async () => {
      setLoading(true);
      const filter = selectedTab === 1 ? "rating" : null;
      const response = await fetch(
        `/api/arts${filter ? `?filter=${filter}` : ""}`
      ).then((res) => res.json());
      setArts(response);
      setLoading(false);
    };
    parentRef.current && autoAnimate(parentRef.current);
    fetchArts();
  }, [selectedTab]);

  return (
    <div className="flex flex-col gap-8" ref={parentRef}>
      {loading && (
        <div className="flex items-center justify-center">
          <Ring color="#fff" />
        </div>
      )}
      <div>
        <Tabs>
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
                  <Ring color="#fff" />
                </div>
              ) : (
                arts && arts.map((art, index) => <Reviews key={index} data={art} />)
              )}
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default RenderArts;
