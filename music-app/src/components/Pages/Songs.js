import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AiFillDelete } from "react-icons/ai";
import styles from "../assets/songs.module.css";
import { Player } from "../Player";
import { MainContext } from "../contexts/MainProvider";
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import { PlayerSecond } from "../PlayerSecond";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { FindPlaylist } from "../FindPlaylist";

export const Songs = (props) => {
  const { accessToken, playlistSong } = useContext(MainContext);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [dur, setDur] = useState();
  const [p, setP] = useState(false);
  const [song_data, setSong_data] = useState();
  const [length, setLength] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState();
  const { id } = useParams("");
  const Navigate = useNavigate();
  const [songId, setSongId] = useState()

  const audioElem = useRef();

  useEffect(() => {

    generateSongs();

  }, []);
  // useEffect(() => {
  //   if (selectedSong != null) {
  //     if (isPlaying) {
  //       audioElem.current.play();
  //     } else {
  //       audioElem.current.pause();
  //     }
  //   }
  // }, [isPlaying, selectedSong]);

  async function generateSongs() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch(
      "https://api.spotify.com/v1/albums/" + `${id}` + "/tracks" + "?market=us",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("song: ", data.items);
        setSongs(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    // console.log(duration, ct)
    setDur((ct / duration) * 100);
    setLength(duration);
  };
  console.log(song_data);
  const ms = 54000000;
  console.log(new Date(ms).toISOString().slice(11, 19)); // 👉️ 15:00:00
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

  console.log(dur);
  return (
    <div className={styles.Container}>
      <div className={`${styles.topCont} ${styles.bgColor1}`}>
        <span>hello</span>
      </div>
      {/* <AiFillDelete onClick={Delete} className={styles.delete} /> */}
      <div className={styles.mainCont}>
        {songs &&
          songs.map((song, index) => {
            return (
              <div
                className={styles.songContainer}
                onClick={() => {
                  setIndex(index);
                  setP(true);
                  setSong_data(song);
                  setSelectedSong(song.preview_url);
                  setIsPlaying(true);
                  console.log("haha");
                  // audioElem.current.play()
                }}
              >
                {/* <img src={song.image} /> */}
                <span className={styles.id}>{index + 1}</span>
                <div className={styles.song}>
                  <span className={styles.songName}>{song.name}</span>
                  <span className={styles.artist}>{song.artists[0].name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className={styles.duration}>
                    {convertMsToTime(song.duration_ms)}
                  </span>


                  <Dropdown className={styles.dots}>
                    <Dropdown.Toggle id="dropdown-basic">
                      {/* <BsThreeDotsVertical  /> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {
                        setSongId(song)
                      }}>
                        Add To Playlist
                        <Dropdown />
                      </Dropdown.Item>
                      <Dropdown.Item >
                        Save To Liked Songs
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                </div>
              </div>
            );
          })}

      </div>

      <>
        {/* <audio src={selectedSong} ref={audioElem} onTimeUpdate={onPlaying} />
        <Player
          songs={songs}
          setSongs={setSongs}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioElem={audioElem}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          index={index}
          setIndex={setIndex}
          dur={dur}
          p={p}
          setSongData={setSong_data}
          songData={song_data}
          length={Math.trunc(length)} */}
        <PlayerSecond src={selectedSong} songData={song_data} isPlaying={p} />
        <FindPlaylist songId={songId} setSongId={setSongId} />
      </>
    </div>
  );
};
