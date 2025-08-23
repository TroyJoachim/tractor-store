import React, { useState, useEffect } from "react";
import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { AddToCart } from "../components/AddToCart";
import { fetchData } from "@tractor-store/shared";

interface AddToCartCeProps {
  sku?: string;
}

const AddToCartCe = ({ sku }: AddToCartCeProps) => {
  const [state, setState] = useState<any>({});
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!sku) return;
      const data = await fetchData("/addtocart", { query: { sku } });
      setState(data);
    };

    run();
  }, [sku]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sku) return;
    await fetchData("/cart/item", { method: "POST", query: { sku } });
    setConfirmed(true);
    window.dispatchEvent(new CustomEvent("checkout:cart-updated"));
  };

  console.log("checkout-add-to-cart hydrated");
  return (
    <AddToCart {...state} confirmed={confirmed} handleSubmit={handleSubmit} />
  );
};

defineReactWebComponent({ component: AddToCartCe, tag: "checkout-add-to-cart", observedAttrs: ["sku"] });

const WebComponent = ({ sku }: { sku: string }) => <checkout-add-to-cart sku={sku}></checkout-add-to-cart>;
export default WebComponent;

console.log("checkout-add-to-cart bundle loaded");
