import { useEffect, useState } from "react";
import { fetchCredits } from "../../movies-api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getCasts() {
      try {
        const data = await fetchCredits(movieId);
        if (data.cast.length === 0) {
          toast.warning("Information about the cast is not available.");
        }
        setMovieCast(data.cast);
      } catch (error) {
        toast.error("Sorry, we couldn't fetch the cast information.");
      } finally {
        setLoading(false);
      }
    }
    getCasts();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {!loading && movieCast.length > 0 && (
        <ul className={styles.list}>
          {movieCast.map(({ id, name, profile_path }) => (
            <li key={id} className={styles.item}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + profile_path}
                alt={name}
              />
              {name}
            </li>
          ))}
        </ul>
      )}
      {movieCast.length === 0 && !loading && (
        <p className={styles.error}>No cast information available.</p>
      )}
    </>
  );
}
