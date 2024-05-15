import { useEffect, useState } from "react";
import { useGlobalContext } from "../../globalContext/GlobalContext";
import { NewPlayList } from "./NewPlayList";

export const PlayListDetailPage = () => {
  const { individualPlaylist, updateIndividualPlayList } = useGlobalContext();
  const [addSongs, setAddSongs] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState(
    individualPlaylist?.playlist
  );

  const sort = () => {
    for (let i = selectedSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedSongs[i], selectedSongs[j]] = [
        selectedSongs[j],
        selectedSongs[i],
      ];
    }
    setSelectedSongs([...selectedSongs]);
  };


  useEffect(() => {
    setSelectedSongs(individualPlaylist?.playlist);
  }, [individualPlaylist]);

  
  return (
    <>
      {addSongs ? (
        <>
          <NewPlayList
            createPlayList={addSongs}
            setCreatePlayList={(e) => setAddSongs(e)}
          />
        </>
      ) : (
        <div>
          <div className="flex items-center justify-end mt_20 mb_20">
            <button
              className="primary_button mr_15 "
              onClick={() => {
                sort();
              }}
            >
              Shuffle Play
            </button>
            <button
              className="primary_button "
              onClick={() => {
                setAddSongs(true);
              }}
            >
              Add Song
            </button>
          </div>
          <div className="list-div-parent">
            {selectedSongs?.map((item, i) => (
              <div
                key={i}
                className="individual-item-list mt_20 justify_between"
              >
                <div className="flex items-center">
                  <div className="img-div">
                    <img src={item?.url} />
                  </div>
                  <span
                    title={item?.title}
                    className="ft_600 capitalize wrap-text"
                  >
                    {item?.title}
                  </span>
                </div>
                {selectedSongs.length > 1 && (
                  <button
                    className="secondary-button cursor-pointer"
                    onClick={() => {
                      const newListCopy = [...selectedSongs];
                      newListCopy.splice(i, 1);
                      setSelectedSongs(newListCopy);
                      updateIndividualPlayList({
                        ...individualPlaylist,
                        playlist: [...newListCopy],
                      });
                    }}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
