import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ trendingMovies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {trendingMovies.map(({ id, title }) => (
        <li key={id} className={styles.item}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={styles.link}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
