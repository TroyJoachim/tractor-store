import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "explore-recommendations": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { skus?: string },
        HTMLElement
      >;
      "explore-header": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "explore-footer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "explore-storepicker": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "checkout-add-to-cart": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { sku?: string },
        HTMLElement
      >;
      "checkout-mini-cart": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "decide-product-page": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { id?: string; sku?: string },
        HTMLElement
      >;
    }
  }
}
