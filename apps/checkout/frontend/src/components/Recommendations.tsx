import React from "react";
import Recommendation from "./Recommendation";

interface RecommendationItem {
  image: string;
  url: string;
  name: string;
  sku: string;
}

interface RecommendationsProps {
  recommendations?: RecommendationItem[];
}

const Recommendations: React.FC<RecommendationsProps> & { api: string } = ({
  recommendations = [],
}) => {
  return recommendations.length ? (
    <div className="ch_Recommendations" data-boundary="checkout">
      <h2>Recommendations</h2>
      <ul className="ch_Recommendations__list">
        {recommendations.map((rec) => (
          <Recommendation key={rec.sku} {...rec} />
        ))}
      </ul>
    </div>
  ) : null;
};

Recommendations.api = "/recommendations";

export default Recommendations;
