import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router";
import styles from "../assets/profilepage.module.css";
import { useAuth } from "../contexts/AuthContext";
import { MainContext } from "../contexts/MainProvider";

export const ProfilePage = () => {
  const { userInfo, playlists } = useContext(MainContext);
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("https://music-backend-zz59.onrender.com/user/" + userId)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log(userInfo);
  return (
    <div className={styles.Container}>
      <div className={styles.topCont}>
        <MdOutlineArrowBackIosNew
          onClick={() => navigate("/")}
          className={styles.backArrow}
        />
        <div style={{ display: "flex" }}>
          <img
            className={styles.proImg}
            src={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <div className={styles.infoCont}>
            <span className={styles.topText}>Profile</span>
            <span className={styles.proName}>{data && data.email}</span>
            <span className={`${styles.topText} ${styles.marginTop}`}>
              {playlists && playlists.length} Public Playlists
            </span>
            <span className={styles.topText}>
              Founded: {data && data.createdAt}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.title}>Favourite Playlists :</span>
      </div>
    </div>
  );
};
