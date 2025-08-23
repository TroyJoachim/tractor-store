import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import ThanksPage from "../pages/ThanksPage";

const ThanksPageCe = () => {
  console.log("checkout-thanks-page hydrated");
  return <ThanksPage />;
};

defineReactWebComponent({ component: ThanksPageCe, tag: "checkout-thanks-page"});

const WebComponent = () => <checkout-thanks-page></checkout-thanks-page>;
export default WebComponent;

console.log("checkout-thanks-page bundle loaded");
