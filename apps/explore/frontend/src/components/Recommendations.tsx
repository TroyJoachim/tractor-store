import Recommendation from "./Recommendation";

type RecommendationItem = {
  image?: string;
  url?: string;
  name?: string;
};

type Props = {
  recommendations?: RecommendationItem[];
};

const Recommendations = ({ recommendations = [] }: Props) => {
  return recommendations.length ? (
    <div className="e_Recommendations">
      <h2>Recommendations</h2>
      <ul className="e_Recommendations_list">{recommendations.map((r, i) => (
        <Recommendation key={i} image={r.image} url={r.url} name={r.name} />
      ))}</ul>
    </div>
  ) : null;
};

export default Recommendations;
