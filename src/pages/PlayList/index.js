import { useState } from "react";
import { NewPlayList } from "./NewPlayList";
import { useGlobalContext } from "../../globalContext/GlobalContext";
import { formatDateTime } from "../../utils";
import { PlayListDetailPage } from "./PlayListDetailPage";

export const PlaylistLayout = () => {
  const [createPlayList, setCreatePlayList] = useState(false);
  const [updatePlayList, setUpdatePlayList] = useState(false);
  const { playlist, updateIndividualPlayList, emptyIndividualPlayList } =
    useGlobalContext();

  return (
    <div>
      {createPlayList ? (
        <>
          <NewPlayList
            createPlayList={createPlayList}
            setCreatePlayList={(e) => setCreatePlayList(e)}
          />
        </>
      ) : (
        <>
          {updatePlayList ? (
            <PlayListDetailPage />
          ) : (
            <div className="list-div-parent">
              {" "}
              {playlist?.map((item) => (
                <div
                  className="playlist-parent flex justify_between"
                  onClick={() => {
                    setUpdatePlayList(true);
                    updateIndividualPlayList(item);
                  }}
                >
                  <div className="playlist-div capitalize ft_600">
                    {item.title}
                  </div>
                  <div>
                    <p className="mb_10 ft_13">Created At</p>
                    <p className="ft_13 ft_600">
                      {formatDateTime(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="p_20 flex items-center justify-center">
                <button
                  className="primary_button mt_20"
                  onClick={() => {
                    emptyIndividualPlayList();
                    setCreatePlayList(true);
                  }}
                >
                  Create your playlist now
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
