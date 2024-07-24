import {
  useParams,
  useNavigate,
  useLocation,
  NavLink,
  Outlet,
} from "react-router-dom";
import { fetchMovieById } from "../../movies-api";
import { useEffect, useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

import Loader from "../../components/Loader/Loader";
import ShortMovieDetails from "../../components/ShortMovieDetails/ShortMovieDetails";
import styles from "./MovieDetailsPage.module.css"; // Импорт стилей

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = useRef(location.state?.from ?? "/");

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

  const handleGoBack = () => navigate(prevLocation.current);

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go Back
      </button>
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
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Casts
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
      <Toaster />
    </div>
  );
}
