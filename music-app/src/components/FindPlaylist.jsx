import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./assets/addtolist.module.css";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { MainContext } from "./contexts/MainProvider";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const FindPlaylist = (props) => {
  const { userInfo, setPlaylists } = useContext(MainContext);
  const [pName, setPName] = useState();
  const [putId, setPutId] = useState();
  const [list, setList] = useState();
  const baseUrl = "http://localhost:8000";

  const { id } = useParams("");
  console.log(putId);
  console.log(props.songId);

  useEffect(() => {
    console.log(userInfo);
    setList(userInfo.playlists);
  }, [userInfo]);

  const addToPlaylist = (playlistId) => {
    axios
      .post(baseUrl + "/songs/", {
        name: props.songId.name,
        artistEx: props.songId.artists[0].name,
        url: props.songId.preview_url,
      })
      .then((res) => {
        // setCreate(false);
        console.log(res.data);
        axios
          .put(baseUrl + "/playlist/" + playlistId, {
            id: res.data._id,
          })
          .then((res) => {
            // window.location.reload(false);
            console.log(res.data);
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
          {list &&
            list.map((playlist, index) => {

              return (
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ opacity: "50%" }}>{index + 1}.</span>
                  <span onClick={() => addToPlaylist(playlist._id)}>
                    {" "}
                    {playlist.title}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
