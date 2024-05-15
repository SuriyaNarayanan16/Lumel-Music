import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const useGlobalContext = () => useContext(Context);

export const GlobalContext = ({ children }) => {
  const [playlist, setplaylist] = useState([]);
  const [individualPlaylist, setIndividualList] = useState([]);
  const [allSong, setAllSongs] = useState([]);

  const createPlayList = (item) => {
    playlist.push(item);
    playlist.sort((a, b) => b.createdAt - a.createdAt);
    setplaylist([...playlist]);
  };

  const updatePlayList = (item) => {
    playlist.map((x) => {
      if (x.id === item.id) {
        x.playlist = item.playlist;
        x.title = item.title;
        x.createdAt = item.createdAt;
      }
    });
    playlist.sort((a, b) => b.createdAt - a.createdAt);

    setplaylist([...playlist]);
  };

  const updateIndividualPlayList = (list) => {
    setIndividualList(list);
    playlist.map((item) => {
      if (item.title === list.title) {
        item.playlist = list.playlist;
      }
    });
    setplaylist([...playlist]);
  };
  const emptyIndividualPlayList = () => {
    setIndividualList({});
  };

  return (
    <Context.Provider
      value={{
        playlist,
        allSong,
        individualPlaylist,
        createPlayList,
        updatePlayList,
        updateIndividualPlayList,
        emptyIndividualPlayList,
      }}
    >
      {children}
    </Context.Provider>
  );
};
