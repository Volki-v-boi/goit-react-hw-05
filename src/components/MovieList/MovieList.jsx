import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ trendingMovies }) {
  return (
    <ul className={styles.list}>
      {trendingMovies.map(({ id, title }) => (
        <li key={id} className={styles.item}>
          <Link to={`/movies/${id}`} className={styles.link}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
