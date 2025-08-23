import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "checkout-add-to-cart": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { sku?: string },
        HTMLElement
      >;
      "checkout-mini-cart": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "checkout-cart-page": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "checkout-checkout-page": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "checkout-thanks-page": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
