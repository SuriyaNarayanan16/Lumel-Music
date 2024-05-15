import { useEffect, useState } from "react";
import { useGlobalContext } from "../../globalContext/GlobalContext";
import { generateRandomString } from "../../utils";

export const NewPlayList = ({ setCreatePlayList }) => {
  const [allsongs, setAllSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [songListClone, setSongListClone] = useState();
  const [loading, setLoading] = useState(true);
  const {
    createPlayList,
    individualPlaylist,
    updateIndividualPlayList,
    updatePlayList,
  } = useGlobalContext();

  const [playlistName, setPlayListName] = useState(generateRandomString());
  const [newlist, setNewPlaylist] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAllSongs(JSON.parse(localStorage.getItem("songs")));
      setSongListClone(JSON.parse(localStorage.getItem("songs")));
      setLoading(false);
    }, [200]);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (Object.keys(individualPlaylist).length > 0) {
        const childIds = individualPlaylist.playlist.map((item) => item.id);
        let tempArray = JSON.parse(localStorage.getItem("songs"));
        let filteredArray = tempArray.filter(
          (parentItem) => !childIds.includes(parentItem.id)
        );
        setAllSongs([...filteredArray]);
        setPlayListName(individualPlaylist.title);
        setNewPlaylist(individualPlaylist.playlist);
      }
    }, [400]);
  }, [individualPlaylist]);

  useEffect(() => {
    if (search) {
      setAllSongs(
        songListClone.filter((obj) =>
          obj.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setAllSongs(songListClone);
    }
  }, [search]);

  const checkIsAdded = (item) => {
    if (!item) return false;
    return newlist.findIndex((addedItem) => addedItem.id === item.id) !== -1;
  };

  const changePlaylist = () => {
    let obj = {
      id: individualPlaylist.id,
      title: playlistName,
      playlist: [...newlist],
      createdAt: new Date(),
    };
    if (Object.keys(individualPlaylist).length > 0) {
      updatePlayList(obj);
      updateIndividualPlayList(obj);
      setCreatePlayList(false);
    } else {
      createPlayList({ ...obj, id: generateRandomString() });
      setCreatePlayList(false);
    }
  };
  const getSpliceItem = (item) => {
    let newListCopy = structuredClone(newlist);
    newListCopy.map((x, i) => {
      if (x.id === item.id) {
        newListCopy.splice(i, 1);
      }
    });
    setNewPlaylist([...newListCopy]);
  };

  return (
    <div className="p_20 ">
      <div className="w_full search_container flex items-center justify-center ">
        {" "}
        <input
          className="search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your favorite songs here"
        />
      </div>
      <div className="">
        {" "}
        {newlist.length > 0 && (
          <div className="flex items-center justify_between mb_20">
            <input
              className="search_input mb_0 w_47"
              value={playlistName}
              onChange={(e) => setPlayListName(e.target.value)}
              placeholder="Provide a playlistname"
            />

            <button
              className="primary_button "
              onClick={() => {
                changePlaylist();
              }}
            >
              {Object.keys(individualPlaylist).length > 0
                ? "Update "
                : "Create "}
              Playlist
            </button>
          </div>
        )}
      </div>
      <div className="list-parent">
        {allsongs?.length > 0 && !loading ? (
          <>
            {allsongs?.map((item, i) => (
              <div key={i} className="individual-item-list justify_between">
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
                {checkIsAdded(item) ? (
                  <button
                    className="secondary-button cursor-pointer"
                    onClick={() => {
                      getSpliceItem(item);
                    }}
                  >
                    {" "}
                    Remove
                  </button>
                ) : (
                  <button
                    className="secondary-button cursor-pointer"
                    onClick={() => {
                      newlist.push(item);
                      setNewPlaylist([...newlist]);
                    }}
                  >
                    {" "}
                    + Add to playList
                  </button>
                )}
              </div>
            ))}
          </>
        ) : (
          <>Please wait songs are being loaded...</>
        )}
      </div>
    </div>
  );
};
