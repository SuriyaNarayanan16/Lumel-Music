import { useEffect, useState } from "react";

export const AllSongComponent = () => {
  const [songList, setSongList] = useState();
  const [search, setSearch] = useState("");
  const [songListClone, setSongListClone] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (search) {
      setSongList(
        songListClone.filter((obj) =>
          obj.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setSongList(songListClone);
    }
  }, [search]);

  useEffect(() => {
    setTimeout(() => {
      let songs = JSON.parse(localStorage.getItem("songs"));
      setSongListClone(songs);
      setSongList(songs);
      setLoading(false);
    }, [200]);
  }, []);

  return (
    <div className="p_20">
      <div className="w_full search_container flex items-center justify-center ">
        {" "}
        <input
          className="search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your favorite songs here"
        />
      </div>
      <div className="list-parent">
        {songList?.length > 0 && !loading ? (
          <>
            {songList?.map((item, i) => (
              <div key={i} className="individual-item-list cursor_pointer">
                <div className="img-div">
                  <img src={item?.url} />
                </div>
                <p className="ft_600 capitalize">{item?.title}</p>
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
