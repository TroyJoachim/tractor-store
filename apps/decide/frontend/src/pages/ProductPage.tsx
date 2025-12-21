import React from "react";
import VariantOption from "../components/VariantOption";
import { src, srcset } from "../utils";
import ExploreRecommendations from "explore/explore-recommendations";
import CheckoutAddToCart from "checkout/checkout-add-to-cart";

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
    <div className="de_ProductPage" data-boundary="decide">
      <div className="de_ProductPage__details">
        <img
          className="de_ProductPage__productImage"
          src={src(variant.image, 400)}
          srcSet={srcset(variant.image, [400, 800])}
          sizes="400px"
          width="400"
          height="400"
          alt={name}
        />
        <div className="de_ProductPage__productInformation">
          <h2 className="de_ProductPage__title">{name}</h2>
          <ul className="de_ProductPage__highlights">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          <ul className="de_ProductPage__variants">
            {variants.map((v) => (
              <VariantOption
                key={v.sku}
                id={id}
                {...v}
                selected={v.sku === variant.sku}
              />
            ))}
          </ul>
          <CheckoutAddToCart sku={variant.sku} />
        </div>
      </div>
      <div className="e_Recommendations">
        <ExploreRecommendations skus={variant.sku} />
      </div>
    </div>
  );
};
