import VariantOption from "../components/VariantOption";
import { src, srcset } from "../utils";
import ExploreRecommendations from "explore/explore-recommendations";
import CheckoutAddToCart from "checkout/checkout-add-to-cart";
import css from "./ProductPage.module.css";

interface Variant {
  sku: string;
  name: string;
  color: string;
  image: string;
  price: number;
}

interface Props {
  id?: string;
  name?: string;
  highlights?: string[];
  variants?: Variant[];
  variant?: Variant;
}

export const ProductPage = ({
  id = "",
  name = "",
  highlights = [],
  variants = [],
  variant = { sku: "", name: "", color: "", image: "", price: 0 },
}: Props) => {
  return (
    <div className={css.root} data-boundary="decide">
      <div className={css.details}>
        <img
          className={css.productImage}
          src={src(variant.image, 400)}
          srcSet={srcset(variant.image, [400, 800])}
          sizes="400px"
          width="400"
          height="400"
          alt={name}
        />
        <div className={css.productInformation}>
          <h2 className={css.title}>{name}</h2>
          <ul className={css.highlights}>
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          <ul className={css.variants}>
            {variants.map((v) => (
              <VariantOption
                key={v.sku}
                id={id}
                {...v}
                selected={v.sku === variant.sku}
              />
            ))}
          </ul>
          <div className={css.checkoutAddToCart}>
            <CheckoutAddToCart sku={variant.sku} />
          </div>
        </div>
      </div>
      <div className={css.recommendations}>
        <ExploreRecommendations skus={variant.sku} />
      </div>
    </div>
  );
};
