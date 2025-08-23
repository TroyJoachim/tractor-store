import React from "react";
import { src, srcset } from "../utils";
import { Navigate } from "@tractor-store/shared";

interface RecommendationProps {
  image: string;
  url: string;
  name: string;
}

const Recommendation: React.FC<RecommendationProps> = ({ image, url, name }) => {
  return (
    <li className="ch_Recommendation">
      <Navigate className="ch_Recommendation__link" path={url}>
        <img
          className="ch_Recommendation__image"
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400])}
          sizes="200px"
          width="200"
          height="200"
          alt={name}
        />
        <span className="ch_Recommendation__name">{name}</span>
      </Navigate>
    </li>
  );
};

export default Recommendation;
