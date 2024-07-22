import { useNavigate } from "react-router-dom";
import styles from "./ShortMovieDetails.module.css";

export default function ShortMovieDetails({
  results: { title, vote_average, overview, genres, poster_path },
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.goBackButton}
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <img
        src={"https://image.tmdb.org/t/p/w500" + poster_path}
        alt={`Poster of ${title}`}
        className={styles.poster}
      />
      <div className={styles.details}>
        <h2>{title}</h2>
        <p>Rating: {vote_average}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h4>Genres</h4>
        <ul className={styles.genresList}>
          {genres.map(({ id, name }) => (
            <li key={id} className={styles.genreItem}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
