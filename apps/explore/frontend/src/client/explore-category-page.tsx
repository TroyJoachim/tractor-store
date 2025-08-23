import { useState, useEffect } from "react";
import { CategoryPage } from "../pages/CategoryPage";
import { fetchData } from "@tractor-store/shared";
import { useParams } from "react-router";

export const CategoryPageCe = () => {
  const [state, setState] = useState<any>({});

  const params = useParams();
  const filter = params.filter;

  useEffect(() => {
    const run = async () => {
      const data = await fetchData("/category", { query: filter ? { filter } : undefined });
      console.log("Fetched category page data:", data);
      setState(data);
    };
    run();

  }, [filter]);

  console.log("explore-category-page hydrated");
  return <CategoryPage {...state} />;
};