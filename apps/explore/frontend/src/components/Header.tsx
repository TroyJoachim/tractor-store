import { Link } from "react-router";
import { Navigation } from "./Navigation";
import { IMAGE_SERVER } from "../utils";
import CheckoutMiniCart from "checkout/checkout-mini-cart";
import css from "./Header.module.css";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.cutter}>
        <div className={css.inner}>
          <Link className={css.link} to="/">
            <img
              className={css.logo}
              src={`${IMAGE_SERVER}/cdn/img/logo.svg`}
              alt="Micro Frontends - Tractor Store"
            />
          </Link>
          <div className={css.navigation}>
            <Navigation />
          </div>
          <div className={css.cart}>
            <CheckoutMiniCart />
          </div>
        </div>
      </div>
    </header>
  );
};
