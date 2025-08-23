import { Link } from "react-router";

type FilterItem = {
  name: string;
  url?: string;
  active?: boolean;
};

type FilterProps = {
  filters: FilterItem[];
};

export const Filter = ({ filters }: FilterProps) => {
  return (
    <div className="e_Filter">
      Filter:
      <ul>
        {filters.map((f, i) =>
          f.active ? (
            <li key={i} className="e_Filter__filter--active">
              {f.name}
            </li>
          ) : (
            <li key={i}>
              <Link to={f.url ?? ""}>{f.name}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
