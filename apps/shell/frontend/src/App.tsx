import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const ExploreHomePage = lazy(() => import("explore/explore-home-page"));

// Top-level router configuration
const router = createBrowserRouter([
  {
    path: "*",
    element: <ExploreHomePage />,
  },
  {
    path: '/admin/*',
    element: <h1>Example: Admin MFE could go here</h1>
  }
]);

export default function App() {
  console.log("Shell: Rendering App Component");

  return (
    <RouterProvider router={router} />
  );
}
