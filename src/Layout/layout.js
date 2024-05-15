import { useEffect, useState } from "react";
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AllSongComponent } from "../pages/AllSongs/AllSongComponent";
import { PlaylistLayout } from "../pages/PlayList";
import { GlobalContext } from "../globalContext/GlobalContext";

export const Layout = () => {
  const [currentTab, setCurrentTab] = useState("all-songs");

  useEffect(() => {
    getAllSongs();
  }, []);

  const getAllSongs = () => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Work with the JSON data here
        localStorage.setItem("songs", JSON.stringify(data.splice(0, 100)));
      })
      .catch((error) => {
        // Handle errors here
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <GlobalContext>
      <div className="parent-div">
        {" "}
        <h1>Lumel Music App</h1>
        <div className="container">
          <div className="parent-container">
            {/* Tab Design */}
            <div className="flex items-center justify-center">
              <div className="tab-container">
                <div
                  onClick={() => setCurrentTab("all-songs")}
                  className={`individual-tab ${
                    currentTab === "all-songs" && "active_tab"
                  }`}
                >
                  All Songs
                </div>
                <div
                  onClick={() => setCurrentTab("playlist")}
                  className={`individual-tab ${
                    currentTab === "playlist" && "active_tab"
                  }`}
                >
                  Playlist
                </div>
              </div>
            </div>

            {/* End of Tab Design */}

            {currentTab === "all-songs" ? (
              <>
                <AllSongComponent />
              </>
            ) : (
              <>
                <PlaylistLayout />
              </>
            )}
          </div>
        </div>
      </div>
    </GlobalContext>
  );
};
