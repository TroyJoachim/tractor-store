import React from "react";
import { fmtprice } from "../utils";
import Button from "./Button";
import { Navigate } from "@tractor-store/shared";
import css from "./AddToCart.module.css";

interface Props {
  sku?: string;
  outOfStock?: boolean;
  variant?: {
    price: number;
    inventory: number;
  };
  confirmed?: boolean;
  handleSubmit?: (event: React.FormEvent) => void;
}

export const AddToCart = ({
  sku,
  outOfStock,
  variant = { price: 0, inventory: 0 },
  confirmed,
  handleSubmit = () => {},
}: Props) => {
  return (
    <form
      action="/checkout/api/cart/item"
      method="POST"
      className={css.root}
      data-boundary="checkout"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="sku" value={sku} />
      <div className={css.information}>
        <p>{fmtprice(variant.price)}</p>
        <p
          className={[
            css.stock,
            outOfStock ? css.stockEmpty : css.stockOk,
          ].join(" ")}
        >
          {outOfStock
            ? "out of stock"
            : `${variant.inventory} in stock, free shipping`}
        </p>
      </div>
      <Button extraClass={css.button} variant="primary" disabled={outOfStock}>
        Add to basket
      </Button>
      <div
        className={[css.confirmed, confirmed ? "" : css.confirmedHidden].join(
          " "
        )}
      >
        <p>Tractor was added.</p>
        <Navigate className={css.link} path="/checkout/cart">
          View in basket.
        </Navigate>
      </div>
    </form>
  );
};
