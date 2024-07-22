import { useEffect, useState } from "react";
import { fetchReviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styles from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getReviews() {
      try {
        const data = await fetchReviews(movieId);
        if (data.results.length === 0) {
          toast.warning("No reviews for this movie yet.");
        }
        setMovieReviews(data.results);
      } catch (error) {
        toast.error("Sorry, we couldn't fetch the reviews.");
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {!loading && movieReviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id} className={styles.reviewItem}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.error}>No reviews available.</p>
      )}
      <Toaster />
    </>
  );
}
