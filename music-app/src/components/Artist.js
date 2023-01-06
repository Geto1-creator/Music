import styles from "./assets/artist.module.css"

export const Artist = (props) => {
    return (
        <div className={styles.Container}>
            <img src={props.img}></img>
            <div className={styles.textCont}>
                <span className={styles.title}>{props.name}</span>
                <span className={styles.texts}>Followers : {props.followers}</span>
                <span className={styles.texts}>Genres : {props.genres}</span>
                <span className={styles.texts}>Popularity : {props.popularity}</span>
            </div>


        </div>
    )
}