import styles from "./assets/player2.module.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export const PlayerSecond = (props) => {
    console.log(props.songData)
  return (
    <div className={props.isPlaying ? `${styles.Container} ${styles.flex}`: styles.Container}>
      <div className={styles.albumCont}>
        <img className={styles.albumImg} src='https://i.scdn.co/image/ab67616d00004851b1c4b76e23414c9f20242268' />
        <div className={styles.songDetails}>
          <span className={styles.songText}>
            {props.songData !== undefined && props.songData.name}
          </span>
          <span className={styles.artistText}>
            {props.songData !== undefined && props.songData.artists[0].name}
          </span>
        </div>
      </div>
      <AudioPlayer
        // className={styles.player}
        autoPlay
        src={props.src}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
      <div style={{width:"15%"}}></div>

    </div>
  );
};
