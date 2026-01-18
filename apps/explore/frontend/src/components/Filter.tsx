import { Link } from "react-router";
import css from "./Filter.module.css";

type FilterItem = {
  name: string;
  url?: string;
  active?: boolean;
};

type Props = {
  filters: FilterItem[];
};

export const Filter = ({ filters }: Props) => {
  return (
    <div className={css.filter}>
      Filter:
      <ul>
        {filters.map((f, i) =>
          f.active ? (
            <li className={css.active}>{f.name}</li>
          ) : (
            <li key={i}>
              <Link to={f.url ?? ""}>{f.name}</Link>
            </li>
          )
        )}
      </ul>
    </div >
  );
};
