import { useState, useEffect } from "react";
import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { ProductPage } from "../pages/ProductPage";
import { fetchData } from "@tractor-store/shared";

const HOST = import.meta.env.VITE_HOST || "http://localhost";
const PORT = import.meta.env.VITE_PORT || "4002";

interface Props {
  id?: string;
  sku?: string;
}

const ProductPageCe = ({ id, sku }: Props) => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      const query: Record<string, string> = { id };
      if (sku) query.sku = sku;
      const data = await fetchData("/product", { query });
      setState(data);
    };

    run();
  }, [id, sku]);

  console.log("decide-product-page hydrated");
  return <ProductPage {...state} />;
};

defineReactWebComponent({
  component: ProductPageCe,
  css: `${HOST}:${PORT}/assets/decide.css`,
  tag: "decide-product-page",
  observedAttrs: ["id", "sku"],
});

const WebComponent = ({ id, sku }: Props) => (
  <decide-product-page id={id} sku={sku}></decide-product-page>
);
export default WebComponent;

console.log("decide-product-page bundle loaded");
