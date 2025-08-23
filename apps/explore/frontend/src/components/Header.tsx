import { Link } from "react-router";
import Navigation from "./Navigation";
import { IMAGE_SERVER } from "../utils";
import CheckoutMiniCart from "checkout/checkout-mini-cart";

export const Header = () => {
  return (
    <header className="e_Header">
      <div className="e_Header__cutter">
        <div className="e_Header__inner">
          <Link className="e_Header__link" to="/">
            <img
              className="e_Header__logo"
              src={`${IMAGE_SERVER}/cdn/img/logo.svg`}
              alt="Micro Frontends - Tractor Store"
            />
          </Link>
          <div className="e_Header__navigation">
            <Navigation />
          </div>
          <div className="e_Header__cart">
            {/* <Fragment team="checkout" name="minicart" /> */}
            <CheckoutMiniCart />
          </div>
        </div>
      </div>
    </header>
  );
};
