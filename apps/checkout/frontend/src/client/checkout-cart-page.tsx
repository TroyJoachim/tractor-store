import { useState, useCallback, useEffect } from "react";
import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { CartPage } from "../pages/CartPage";
import { fetchData } from "@tractor-store/shared";

const CartPageCe = () => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const run = async () => {
      const data = await fetchData("/cart");
      setState(data);
    };

    run();
  }, []);

  const handleDelete = useCallback(async (sku: string) => {
    await fetchData("/cart/item", { method: "DELETE", query: { sku } });
    window.dispatchEvent(new CustomEvent("checkout:cart-updated"));
    const data = await fetchData("/cart");
    setState(data);
  }, []);

  console.log("checkout-cart-page hydrated");
  return <CartPage {...state} handleDelete={handleDelete} />;
};

defineReactWebComponent({ component: CartPageCe, tag: "checkout-cart-page" });

const WebComponent = () => <checkout-cart-page></checkout-cart-page>;
export default WebComponent;

console.log("checkout-cart-page bundle loaded");
