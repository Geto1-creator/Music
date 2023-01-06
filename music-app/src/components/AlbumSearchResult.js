import React from "react";
import { Card } from "react-bootstrap";
import styles from "./assets/albumResult.module.css";
export function AlbumSearchResult({ album, chooseTrack }) {
  function handlePlay() {
    chooseTrack(album);
  }

  return (
    <Card className={styles.card} onClick={handlePlay}>
      <Card.Img className={styles.img} src={album.images[0].url} />
      <Card.Body>
        <Card.Title className={styles.title}>{album.name}</Card.Title>
        <span className={styles.artist}>Artist : {album.artists[0].name}</span>
      </Card.Body>
      <div className={styles.play}></div>
    </Card>
  );
}
