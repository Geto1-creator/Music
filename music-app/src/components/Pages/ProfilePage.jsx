import { useContext } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router";
import styles from "../assets/profilepage.module.css";
import { MainContext } from "../contexts/MainProvider";

export const ProfilePage = () => {
  const { userInfo } = useContext(MainContext);
  const navigate = useNavigate();


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
            <span className={styles.proName}>{userInfo && userInfo.email}</span>
            <span className={`${styles.topText} ${styles.marginTop}`}>
              {userInfo && userInfo.playlists.length} Public Playlists
            </span>
            <span className={styles.topText}>Founded: {userInfo && userInfo.createdAt}</span>
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.title}>Favourite Playlists :</span>
      </div>
    </div>
  );
};
