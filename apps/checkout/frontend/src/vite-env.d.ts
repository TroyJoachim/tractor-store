/// <reference types="vite/client" />
/// <reference types="react" />

declare global {
  interface Window {
    CHECKOUT_ADDTOCART?: Record<string, any>;
    CHECKOUT_MINICART?: Record<string, any>;
    CHECKOUT_CART?: Record<string, any>;
  }

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
    }
  }
}

export {};
