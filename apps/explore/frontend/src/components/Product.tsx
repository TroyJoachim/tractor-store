import { Link } from "react-router";
import { src, srcset, fmtprice } from "../utils";
import css from "./Product.module.css";

type Props = {
  name: string;
  url: string;
  image: string;
  startPrice: number;
};

export const Product = ({ name, url, image, startPrice }: Props) => {
  return (
    <li className={css.product}>
      <Link className={css.link} to={url}>
        <img
          className={css.image}
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400, 800])}
          sizes="300px"
          width={200}
          height={200}
        />
        <span className={css.name}>{name}</span>
        <span className={css.price}>{fmtprice(startPrice)}</span>
      </Link>
    </li>
  );
};
