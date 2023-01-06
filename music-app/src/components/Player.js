import styles from "./assets/player.module.css";
import { BsFillVolumeDownFill, BsSpotify } from "react-icons/bs";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { IoPlayBackCircle, IoPlayForwardCircle } from "react-icons/io5"
import Album from "./img/boku.jpg";

import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useRef, useState } from "react";

export function Player({ audioElem, setSongData, setIndex, index, songs, isPlaying, setIsPlaying, selectedSong, dur, p, songData, length, setSelectedSong }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);


  function previousSong() {
    setSelectedSong(songs[index - 1].preview_url)
    setSongData(songs[index - 1])
    setIndex(index - 1)

  }
  function nextSong() {
    setSelectedSong(songs[index + 1].preview_url)
    setSongData(songs[index + 1])
    setIndex(index + 1)
  }

  const PlayPause = ({ }) => {
    setIsPlaying(!isPlaying)
    audioElem.current.play()
  }

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);


  return (

    <div className={p ? `${styles.Container} ${styles.flex} ` : styles.Container}>
      <div className={styles.albumCont}>
        <img className={styles.albumImg} src={Album} />
        <div className={styles.songDetails}>
          <span className={styles.songText}>{songData !== undefined && songData.name}</span>
          <span className={styles.artistText}>{songData !== undefined && songData.artists[0].name}</span>
        </div>
      </div>
      <div className={styles.middleCont}>
        <div className={styles.gg}>
          <IoPlayBackCircle className={styles.playBackForward} onClick={() => previousSong()} />
          {isPlaying ? <AiFillPauseCircle onClick={PlayPause} className={styles.playIcon} /> :
            <AiFillPlayCircle className={styles.playIcon} onClick={PlayPause} />
          }
          <IoPlayForwardCircle className={styles.playBackForward} onClick={() => nextSong()} />
        </div>


        <div className={styles.navigation}>
          <div className={styles.navigation_wrapper}>
            <div className={styles.seek_bar} style={{ width: `${dur + "%"}` }}></div>
            <div className={styles.duration}>
              <span className={styles.dText}>00:{("0" + ((time / 10) % 100)).slice(-2)}</span>
              <span className={styles.dText}>00:{length}</span>
            </div>
          </div>
        </div>



      </div>
      <div className={styles.volume}>
        {/* <BsFillVolumeDownFill className={styles.volIcon} />
        <BsFillVolumeDownFill className={styles.volIcon} /> */}
        <BsFillVolumeDownFill className={styles.volIcon} />
        <input type="range" name="volBar" />
      </div>


    </div>
  );


}
