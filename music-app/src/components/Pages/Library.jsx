import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/library.module.css";
import { MainContext } from "../contexts/MainProvider";
import { PlayList } from "../PlayList";
export const Library = () => {
  const { playlists, setPlaylistSong } = useContext(MainContext);
  return (
    <div className={styles.Container}>
      <div className={styles.InnerContainer}>
        <span className={styles.title}>LIBRARY</span>
      </div>
      <div className={styles.playlistContainer}>
        {playlists &&
          playlists.map((playlist, index) => {
            return (
              <Link
                to={`/playlist/${playlist._id}`}
                onClick={() => {
                  console.log(playlist.title);
                  setPlaylistSong(true);
                }}>
                <PlayList
                  key={index + playlist}
                  // image={playlist.userId.image}
                  description={playlist.description}
                  title={playlist.title}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};
