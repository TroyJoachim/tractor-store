import React from "react";
import { fmtprice } from "../utils";
import Button from "./Button";
import { Navigate } from "@tractor-store/shared";

interface AddToCartProps {
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
  handleSubmit = () => { },
}: AddToCartProps) => {
  return (
    <form
      action="/checkout/api/cart/item"
      method="POST"
      className="ch_AddToCart"
      data-boundary="checkout"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="sku" value={sku} />
      <div className="ch_AddToCart__information">
        <p>{fmtprice(variant.price)}</p>
        <p
          className={`ch_AddToCart__stock ${outOfStock ? "ch_AddToCart__stockEmpty" : "ch_AddToCart__stockOk"
            }`}
        >
          {outOfStock
            ? "out of stock"
            : `${variant.inventory} in stock, free shipping`}
        </p>
      </div>
      <Button
        extraClass="ch_AddToCart__button"
        variant="primary"
        disabled={outOfStock}
      >
        Add to basket
      </Button>
      <div
        className={`ch_AddToCart__confirmed ${confirmed ? "" : "ch_AddToCart__confirmedHidden"
          }`}
      >
        <p>Tractor was added.</p>
        <Navigate className="ch_AddToCart__link" path="/checkout/cart">
          View in basket.
        </Navigate>
      </div>
    </form>
  );
};
