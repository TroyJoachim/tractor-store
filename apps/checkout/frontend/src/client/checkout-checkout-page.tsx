import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { CheckoutPage } from "../pages/CheckoutPage";
import { navigate } from "@tractor-store/shared";

const HOST = import.meta.env.VITE_HOST || "http://localhost";
const PORT = import.meta.env.VITE_PORT || "4003";

const CheckoutPageCe = () => {
  console.log("checkout-checkout-page hydrated");
  return <CheckoutPage onPlaceOrder={() => navigate("/checkout/thanks")} />;
};

defineReactWebComponent({
  component: CheckoutPageCe,
  css: `${HOST}:${PORT}/assets/checkout.css`,
  tag: "checkout-checkout-page",
});

const WebComponent = () => <checkout-checkout-page></checkout-checkout-page>;
export default WebComponent;

console.log("checkout-checkout-page bundle loaded");
