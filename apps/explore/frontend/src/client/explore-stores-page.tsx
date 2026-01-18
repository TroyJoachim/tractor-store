import { useState, useEffect } from "react";
import { StoresPage } from "../pages/StoresPage";
import { fetchData } from "@tractor-store/shared";

export const StoresPageCe = () => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const run = async () => {
      const data = await fetchData("/stores", {});
      console.log("Fetched stores page data:", data);
      setState(data);
    };
    run();
  }, []);

  console.log("explore-stores-page hydrated");
  return <StoresPage {...state} />;
};
