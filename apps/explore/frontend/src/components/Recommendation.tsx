import React from "react";
import { src, srcset } from "../utils";
import { Navigate } from "@tractor-store/shared";

type RecommendationProps = {
  image?: string | undefined;
  url?: string | undefined;
  name?: string | undefined;
};

const Recommendation: React.FC<RecommendationProps> = ({ image = "", url = "#", name = "" }) => {
  return (
    <li className="e_Recommendation">
      <Navigate className="e_Recommendation_link" path={url}>
        <img
          className="e_Recommendation_image"
          src={src(image || "", 200)}
          srcSet={srcset(image || "", [200, 400])}
          sizes="200px"
          width={200}
          height={200}
        />
        <span className="e_Recommendation_name">{name}</span>
      </Navigate>
    </li>
  );
};

export default Recommendation;
