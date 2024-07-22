import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import styles from "./HomePage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../movies-api";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getMovies() {
      try {
        const data = await fetchMovies();
        setTrendingMovies(data.results);
      } catch (error) {
        toast.error("Sorry, we couldn't fetch the movies.");
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      {loading && <Loader />}
      {trendingMovies.length > 0 && (
        <MovieList trendingMovies={trendingMovies} />
      )}
      <Toaster />
    </div>
  );
}
