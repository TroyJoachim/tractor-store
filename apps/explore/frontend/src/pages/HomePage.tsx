import { Link } from "react-router";
import { src, srcset } from "../utils";
import { RecommendationsCe } from "../client/explore-recommendations";
import css from "./HomePage.module.css"

type TeaserItem = {
  title?: string;
  image?: string;
  url?: string;
};

type Props = {
  teaser?: TeaserItem[];
};

const skus = "CL-01-GY,AU-07-MT";

export const HomePage = ({ teaser = [] }: Props) => {
  return (
    <>
      <div className={css.page}>
        {teaser.map((t, i) => (
          <Link key={i} className={css.categoryLink} to={t.url || "/"}>
            <img
              src={src(t.image || "", 500)}
              srcSet={srcset(t.image || "", [500, 1000])}
              sizes="100vw, (min-width: 500px) 50vw"
              alt={t.title}
            />
            {t.title}
          </Link>
        ))}
      </div>
      <RecommendationsCe skus={skus} />
    </>
  );
};