import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { useState, useEffect, lazy } from "react";
import { HomePage } from "../pages/HomePage";
import { fetchData } from "@tractor-store/shared";
import { createBrowserRouter, RouterProvider, useParams, useSearchParams } from "react-router";
import { CategoryPageCe } from "./explore-category-page";
import { StoresPageCe } from "./explore-stores-page";
import { Layout } from "../components/Layout";

const HOST = import.meta.env.VITE_HOST || 'http://localhost';
const PORT = import.meta.env.VITE_PORT || '4001';

const DecideProductPage = lazy(() => import("decide/decide-product-page"));
const CheckoutCartPage = lazy(() => import("checkout/checkout-cart-page"));
const CheckoutCheckoutPage = lazy(() => import("checkout/checkout-checkout-page"));
const CheckoutThanksPage = lazy(() => import("checkout/checkout-thanks-page"));

const HomePageCe = () => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const run = async () => {
      const data = await fetchData("/home", {});
      console.log("Fetched home page data:", data);
      setState(data);
    };
    run();
  }, []);

  console.log("explore-home-page hydrated");
  return <HomePage {...state} />;
};

const DecideProductPageWrapper = () => {
  const params = useParams();
  const id = params.id || "";
  const [searchParams] = useSearchParams();
  const sku = searchParams.get("sku") || "";

  return <DecideProductPage id={id} sku={sku} />
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePageCe />
      },
      {
        path: "/stores",
        element: <StoresPageCe />,
      },
      {
        path: "/products",
        element: <CategoryPageCe />,
      },
      {
        path: "/products/:filter",
        element: <CategoryPageCe />,
      },
      {
        path: "/product/:id",
        element: <DecideProductPageWrapper />,
      },
      {
        path: "/checkout/cart",
        element: <CheckoutCartPage />,
      },
      {
        path: "/checkout/checkout",
        element: <CheckoutCheckoutPage />,
      },
      {
        path: "/checkout/thanks",
        element: <CheckoutThanksPage />,
      },
    ],
  },
])

// register category as web component
const ExploreWrapper = () => {
  useEffect(() => {
    const handleShellNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ path: string }>;
      console.log(customEvent);
      router.navigate(customEvent.detail.path);
    };

    document.addEventListener('shell:navigate', handleShellNavigate);

    return () => {
      document.removeEventListener('shell:navigate', handleShellNavigate);
    };
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

defineReactWebComponent({
  component: ExploreWrapper,
  css: `${HOST}:${PORT}/assets/explore.css`,
  tag: "explore-home-page",
  dataBoundaryPageAttr: "explore"
});

const WebComponent = () => <explore-home-page></explore-home-page>;
export default WebComponent;

console.log("explore-home-page bundle loaded");
