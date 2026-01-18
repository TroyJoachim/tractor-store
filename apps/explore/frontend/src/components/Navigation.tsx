import { Link } from "react-router";
import css from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <ul className={css.list}>
        <li className={css.item}>
          <Link to="/products">Machines</Link>
        </li>
        <li className={css.item}>
          <Link to="/stores">Stores</Link>
        </li>
      </ul>
    </nav>
  );
};
