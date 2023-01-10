import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./assets/addtolist.module.css";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { MainContext } from "./contexts/MainProvider";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

export const FindPlaylist = (props) => {
  const { userInfo, setPlaylists, playlists } = useContext(MainContext);
  const [pName, setPName] = useState();
  const [putId, setPutId] = useState();
  const [list, setList] = useState();
  const baseUrl = "https://music-backend-zz59.onrender.com";

  const { id } = useParams("");


  const addToPlaylist = (playlistId) => {
    axios
      .post(baseUrl + "/songs/", {
        name: props.songId.name,
        artistEx: props.songId.artists[0].name,
        url: props.songId.preview_url,
      })
      .then((res) => {
        // setCreate(false);
        axios
          .put(baseUrl + "/playlist/" + playlistId, {
            id: res.data._id,
          })
          .then((res) => {
            // window.location.reload(false);
            props.setSongId(null);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={
        props.songId
          ? styles.container2
          : `${styles.container2} ${styles.displayNone}`
      }>
      <ImCross
        onClick={() => props.setSongId(null)}
        className={styles.disable}
      />

      <div className={styles.headSector}>
        <span className={styles.title}>Playlists</span>
      </div>
      <input
        placeholder="Find Playlist"
        className={`${styles.inp} ${styles.marginTop}`}
      />
      <div className={styles.midSector}>
        <div className={styles.innerCont}>
          {playlists &&
            playlists.map((playlist, index) => {
              return (
                <div className={styles.div}>
                  <div>
                    <span style={{ opacity: "50%" }}>{index + 1}.</span>
                    <span> {playlist.title}</span>
                  </div>

                  <IoAdd
                    className={styles.addIcon}
                    onClick={() => addToPlaylist(playlist._id)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
