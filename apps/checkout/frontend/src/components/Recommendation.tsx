import { src, srcset } from "../utils";
import { Navigate } from "@tractor-store/shared";
import css from "./Recommendation.module.css";

interface Props {
  image: string;
  url: string;
  name: string;
}

export const Recommendation = ({ image, url, name }: Props) => {
  return (
    <li className={css.root}>
      <Navigate className={css.link} path={url}>
        <img
          className={css.image}
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400])}
          sizes="200px"
          width="200"
          height="200"
          alt={name}
        />
        <span className={css.name}>{name}</span>
      </Navigate>
    </li>
  );
};
