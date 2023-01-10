import { Dropdown } from "react-bootstrap";
import styles from "./assets/profile.module.css";
import { useAuth } from "./contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { MainContext } from "./contexts/MainProvider";
import { useEffect } from "react";

export const Profile = () => {
  const { currentUser, userId, setUserId } = useAuth();
  const { setDisplayProfile, displayProfile, setPlaylists } =
    useContext(MainContext);
  const auth = getAuth();
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname == "/login" || location.pathname == "/search" || location.pathname == "signup") {
      setDisplayProfile(false);
    } else {
      setDisplayProfile(true);
    }
  }, [location]);

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        setUserId(null);
        localStorage.clear();
        setPlaylists(null);
      
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Dropdown style={{ borderRadius: "30px" }}>
      <div
        className={
          currentUser && displayProfile
            ? styles.container
            : `${styles.container} ${styles.none}`
        }>
        <Dropdown.Toggle className={styles.profile}>
          <img
            className={styles.proImg}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
          <span className={styles.texts}>
            {currentUser && currentUser.email}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              if (userId) navigate(`/profile/${userId}`);
            }}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item onClick={SignOut}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </div>
    </Dropdown>
  );
};
