import { Recommendation } from "./Recommendation";
import css from "./Recommendations.module.css";

type RecommendationItem = {
  image?: string;
  url?: string;
  name?: string;
};

type Props = {
  recommendations?: RecommendationItem[];
};

export const Recommendations = ({ recommendations = [] }: Props) => {
  return recommendations.length ? (
    <div className={css.recommendations}>
      <h2>Recommendations</h2>
      <ul className={css.list}>
        {recommendations.map((r, i) => (
          <Recommendation key={i} image={r.image} url={r.url} name={r.name} />
        ))}
      </ul>
    </div>
  ) : null;
};
