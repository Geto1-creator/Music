import styles from "./assets/playlist.module.css";
import { BiUpvote } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { AiFillDelete, AiFillPlayCircle } from "react-icons/ai";
import axios from "axios";

export const PlayList = (props) => {
  return (
    <div className={styles.Container}>
      <img className={styles.img} src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg" />
      <AiFillPlayCircle className={styles.playIcon} />
      <div className={styles.textCont}> {props.title}</div>
      <div>
        <span className={styles.des}> {props.description}</span>
      </div>
      <div className={styles.voteCont}>
        <BiUpvote className={styles.icon} />
        <span className={styles.botText}>{props.Vote}</span>
      </div>

    </div>
  );
};
