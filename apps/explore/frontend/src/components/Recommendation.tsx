import { src, srcset } from "../utils";
import { Navigate } from "@tractor-store/shared";
import css from "./Recommendation.module.css";

type Props = {
  image?: string | undefined;
  url?: string | undefined;
  name?: string | undefined;
};

export const Recommendation = ({ image = "", url = "#", name = "" }: Props) => {
  return (
    <li className={css.recommendation}>
      <Navigate className={css.link} path={url}>
        <img
          className={css.image}
          src={src(image || "", 200)}
          srcSet={srcset(image || "", [200, 400])}
          sizes="200px"
          width={200}
          height={200}
        />
        <span className={css.name}>{name}</span>
      </Navigate>
    </li>
  );
};
