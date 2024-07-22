import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovieById } from "../../movies-api";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Loader from "../../components/Loader/Loader";
import ShortMovieDetails from "../../components/ShortMovieDetails/ShortMovieDetails";
import styles from "./MovieDetailsPage.module.css"; // Импорт стилей

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getMovies() {
      setLoader(true);
      try {
        const data = await fetchMovieById(movieId);
        setTrendingMovies(data);
      } catch (error) {
        toast.error("Sorry, we couldn't fetch the movie details.");
      } finally {
        setLoader(false);
      }
    }
    getMovies();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {trendingMovies && (
        <ShortMovieDetails
          results={trendingMovies}
          className={styles.details}
        />
      )}
      {loader && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <nav className={styles.nav}>
        <NavLink
          to="cast"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Casts
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
      <Toaster />
    </div>
  );
}
