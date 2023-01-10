import styles from "../assets/home.module.css";
import Cover from "../img/covers.jpeg";
import { useState, useEffect, useContext, useRef } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { PlayList } from "../PlayList";
import axios from "axios";
import PlayListImg from "../img/rapcav.jpeg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CreateList } from "../CreateList";
import { MainContext } from "../contexts/MainProvider";
import { useAuth } from "../contexts/AuthContext";

const PLAYLIST_ENDPOINT = "	https://api.spotify.com/v1/me/playlists";
export const Home = () => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate()
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



  return (
    <>
      <div
        className={
          create ? `${styles.Container} ${styles.blur}` : styles.Container
        }
      >
        {!currentUser &&
          <div className={styles.topCont}>

            {/* <div className={styles.coverTextCont}>
              <span className={styles.coverTitle}> Connect on Invader</span>
              <p className={styles.coverText}>
                Discover, stream, and share a constantly expanding mix of music
                from emerging and major artists around the world.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', }}>
                <Button onClick={() => navigate('/signup')}>Sign Up</Button>

              </div>
            </div> */}

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "70%" }}>
              <span className={styles.coverTitle2}>Connect on Invader</span>
              <span className={styles.coverText}> Discover, stream, and share a constantly expanding mix of music
                from emerging and major artists around the world..
              </span>
              <Button onClick={() => navigate('/signup')} className={styles.coverButton}> Sign Up</Button>
            </div>
          </div>
        }
        {currentUser &&
          <div className={styles.welcomeCont}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "70%" }}>
              <span className={styles.coverTitle2}>Welcome to Invader</span>
              <span className={styles.coverText}>Invader is a proprietary  audio streaming and media services provider founded on 7 January 2023 by Turbold (AKA Raye).
              </span>
              <Button onClick={() => navigate('/search')} className={styles.coverButton}> Start Exploring</Button>
            </div>
          </div>
        }
        {!currentUser &&
          <div className={styles.uCont}>
            <span className={styles.uText}>Sign in First</span>
          </div>
        }
        <div className={styles.contentContainer}>
          {currentUser && <div className={styles.title}> Your Playlists</div>}
          <div className={styles.playlistContainer}>

            {playlists &&
              currentUser &&
              playlists.map((playlist, index) => {
                return (
                  <Link
                    to={`/playlist/${playlist._id}`}
                    onClick={() => {
                  
                      setPlaylistSong(true)
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
            {currentUser && <PlayList
              addList={true}
              // image={playlist.userId.image}
              title='Add Playlist'
            />}

          </div>
        </div>
      </div>
      <CreateList />
    </>
  );
};
