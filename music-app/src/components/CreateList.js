import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./assets/createlist.module.css";
import { MdOutlineDisabledByDefault } from 'react-icons/md'
import { MainContext } from "./contexts/MainProvider";
import { useAuth } from "./contexts/AuthContext";
import { ImCross } from "react-icons/im";

export const CreateList = () => {
  const { create, setCreate, playlists, setPlaylists, userInfo } =
    useContext(MainContext);

  let playlistName = useRef();
  const [pName, setPName] = useState();
  const [des, setDes] = useState("");
  const [added, setAdded] = useState(false)
  // console.log(create);
  const baseUrl = "https://music-backend-zz59.onrender.com";

  // console.log(userId)
  const createPlaylist = () => {
    const title = playlistName.current.value;
    if (title)
      axios
        .post(baseUrl + "/playlists", {
          title: title,
          description: des,
          isPrivate: false,
        })
        .then((res) => {
          if (userInfo) {
            if (userInfo._id)
              axios
                .put(`https://music-backend-zz59.onrender.com/user/` + userInfo._id, {
                  id: res.data._id
                })
                .then((res) => {
                  axios
                    .get(`https://music-backend-zz59.onrender.com/user/` + userInfo._id)
                    .then((res) => {
                      playlistName.current.value = ""
                      setCreate(false);
                      console.log(res.data);
                      setPlaylists(res.data.playlists)
                    })
                    .catch((error) => {
                      console.log(error)
                    });
                })
                .catch((error) => {
                  console.log(error)
                });
          }


        })
        .catch((error) => {
          console.log(error);
        });
  };


  return (
    <div
      className={
        create ? styles.container : `${styles.container} ${styles.displayNone}`
      }
    >
      <div className={styles.headSector}>
        <span className={styles.title}>Create Playlist</span>
        <ImCross onClick={() => setCreate(false)} className={styles.disable} />
      </div>
      <div className={styles.midSector}>
        <button variant="light" className={styles.imgInp}></button>
        <div className={styles.infoSector}>
          <div>
            <label className={styles.infoText}>Name:</label>
            <input
              ref={playlistName}
              placeholder="My Playlist #1"
              className={styles.inp}
            ></input>
          </div>
          <div>
            <label className={styles.infoText}>Description:</label>
            <input

              onChange={(e) => setDes(e.target.value)}
              value={des}
              placeholder="Add an optional description"
              className={styles.inpD}
            ></input>
          </div>
          <Button onClick={createPlaylist} className={styles.saveButton} variant="light">
            Create
          </Button>
        </div>
      </div>
      <div className={styles.botSector}>
        <span className={styles.botText}>
          By proceeding, you agree to give Invader access to the image you
          choose to upload. Please make sure you have the right to upload the
          image.
        </span>
      </div>
    </div>
  );
};
