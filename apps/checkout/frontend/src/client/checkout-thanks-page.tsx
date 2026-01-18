import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { ThanksPage } from "../pages/ThanksPage";

const HOST = import.meta.env.VITE_HOST || "http://localhost";
const PORT = import.meta.env.VITE_PORT || "4001";

const ThanksPageCe = () => {
  console.log("checkout-thanks-page hydrated");
  return <ThanksPage />;
};

defineReactWebComponent({
  component: ThanksPageCe,
  css: `${HOST}:${PORT}/assets/checkout.css`,
  tag: "checkout-thanks-page",
});

const WebComponent = () => <checkout-thanks-page></checkout-thanks-page>;
export default WebComponent;

console.log("checkout-thanks-page bundle loaded");
