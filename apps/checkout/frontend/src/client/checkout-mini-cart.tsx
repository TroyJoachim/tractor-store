import { useState, useEffect, useRef } from "react";
import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import MiniCart from "../components/MiniCart";
import { fetchData } from "@tractor-store/shared";

const HOST = import.meta.env.VITE_HOST || 'http://localhost';
const PORT = import.meta.env.VITE_PORT || '4003';

const MiniCartCe = () => {
  const [state, setState] = useState<any>({});
  const [highlight, setHighlight] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(() => {
    let mounted = true;

    const fetchCartData = async () => {
      const data = await fetchData(MiniCart.api);
      if (mounted) setState(data);
    };

    const handleCartUpdated = async () => {
      await fetchCartData();
      setHighlight(true);
      setTimeout(() => setHighlight(false), 600);
    };

    window.addEventListener("checkout:cart-updated", handleCartUpdated);

    if (isInitialRender.current && state.quantity !== undefined) {
      isInitialRender.current = false;
    } else {
      fetchCartData();
    }

    return () => {
      mounted = false;
      window.removeEventListener("checkout:cart-updated", handleCartUpdated);
    };
  }, []);

  console.log("checkout-mini-cart hydrated");
  return <MiniCart {...state} highlight={highlight} />;
};

defineReactWebComponent({
  component: MiniCartCe,
  cssHref: `${HOST}:${PORT}/css/index.css`,
  tag: "checkout-mini-cart"
});

const WebComponent = () => <checkout-mini-cart></checkout-mini-cart>;
export default WebComponent;

console.log("checkout-mini-cart bundle loaded");
