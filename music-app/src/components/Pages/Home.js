import styles from "../assets/home.module.css";
import Cover from "../img/covers.jpeg";
import { useState, useEffect, useContext, useRef } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { PlayList } from "../PlayList";
import axios from "axios";
import PlayListImg from "../img/rapcav.jpeg";
import { Link, useParams } from "react-router-dom";
import { CreateList } from "../CreateList";
import { MainContext } from "../contexts/MainProvider";
import { useAuth } from "../contexts/AuthContext";

const PLAYLIST_ENDPOINT = "	https://api.spotify.com/v1/me/playlists";
export const Home = () => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const {
    create,
    setCreate,
    playlists,
    setPlaylists,
    playlistSong,
    setPlaylistSong,
    accessToken,
    userInfo,
  } = useContext(MainContext);
  const { currentUser, userId } = useAuth();

  // const handleGetPlaylists = () => {
  // }

  // console.log(accessToken)
  // useEffect(() => {
  //   const getPlaylistData = async () => {
  //     const response = await axios
  //       .get(PLAYLIST_ENDPOINT, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         setData(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   getPlaylistData();
  // }, [accessToken]);

  console.log(playlists);

  return (
    <>
      <div
        className={
          create ? `${styles.Container} ${styles.blur}` : styles.Container
        }
      >
        {/* <div className={styles.topCont}>
          
          <div className={styles.coverTextCont}>
            <span className={styles.coverTitle}> Connect on Invader</span>
            <p className={styles.coverText}>d
              Discover, stream, and share a constantly expanding mix of music
              from emerging and major artists around the world.
            </p>

          </div>
          <img className={styles.coverImg} src="https://digwallpapers.com/wallpapers/full/3/b/e/15985-3840x2160-music-background-photo-desktop-4k.jpg"></img>
        </div> */}

        <div className={styles.contentContainer}>
          <div className={styles.title}>Playlists</div>
          <div className={styles.playlistContainer}>
            {!userInfo && <Spinner />}
            {playlists &&
              currentUser &&
              playlists.map((playlist, index) => {
                return (
                  <Link
                    to={`/playlist/${playlist._id}`}
                    onClick={() => {
                      console.log(playlist.title);
                      setPlaylistSong(true);

                      // window.localStorage.setItem(
                      //   "APP_PLAYLIST",
                      //   JSON.stringify(playlist.title)
                      // );
                    }}
                  >
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
      </div>
      <CreateList />
    </>
  );
};
