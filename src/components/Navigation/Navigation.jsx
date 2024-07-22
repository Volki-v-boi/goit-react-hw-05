import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navigation.module.css"; // Импорт CSS-модуля

export default function Navigation() {
  return (
    <>
      <nav className={styles.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Movies
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
