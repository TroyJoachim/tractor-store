// Explore modules
declare module "explore-home-page" {
  import { ComponentType } from "react";
  const ExploreHomePage: ComponentType;
  export default ExploreHomePage;
}

declare module "explore-stores-page" {
  import { ComponentType } from "react";
  const ExploreStoresPage: ComponentType;
  export default ExploreStoresPage;
}

declare module "explore-category-page" {
  import { ComponentType } from "react";
  const ExploreCategoryPage: ComponentType;
  export default ExploreCategoryPage;
}

// Decide modules
declare module "decide-product-page" {
  import { ComponentType } from "react";
  const DecideProductPage: ComponentType;
  export default DecideProductPage;
}

// Checkout modules
declare module "checkout-cart-page" {
  import { ComponentType } from "react";
  const CheckoutCartPage: ComponentType;
  export default CheckoutCartPage;
}

declare module "checkout-checkout-page" {
  import { ComponentType } from "react";
  const CheckoutCheckoutPage: ComponentType;
  export default CheckoutCheckoutPage;
}

declare module "checkout-thanks-page" {
  import { ComponentType } from "react";
  const CheckoutThanksPage: ComponentType;
  export default CheckoutThanksPage;
}

// Custom element declarations for web components
declare namespace JSX {
  interface IntrinsicElements {
    'explore-home-page': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'explore-stores-page': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'explore-category-page': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}