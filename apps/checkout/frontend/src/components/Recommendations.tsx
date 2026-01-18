import { Recommendation } from "./Recommendation";
import css from "./Recommendations.module.css";

interface RecommendationItem {
  image: string;
  url: string;
  name: string;
  sku: string;
}

interface Props {
  recommendations?: RecommendationItem[];
}

export const Recommendations = ({ recommendations = [] }: Props) => {
  return recommendations.length ? (
    <div className={css.recommendations} data-boundary="checkout">
      <h2>Recommendations</h2>
      <ul className={css.list}>
        {recommendations.map((rec) => (
          <Recommendation key={rec.sku} {...rec} />
        ))}
      </ul>
    </div>
  ) : null;
};
