import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { useState, useEffect } from "react";
import Recommendations from "../components/Recommendations";
import { fetchData } from "@tractor-store/shared";

type Props = {
  skus?: string;
};

export const RecommendationsCe = ({ skus }: Props) => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const run = async () => {
      const data = await fetchData("/recommendations", { query: { skus: skus || "" } });
      console.log("Fetched recommendations data:", data);
      setState(data);
    };
    run();
  }, [skus]);

  return <Recommendations {...state} />;
};

// register recommendations as web component
defineReactWebComponent({ component: RecommendationsCe, tag: "explore-recommendations", dataBoundaryAttr: "explore", observedAttrs: ["skus"] });

// Needed for lazy loading
const WebComponent = ({ skus }: Props) => <explore-recommendations skus={skus}></explore-recommendations>;
export default WebComponent;

console.log("explore-recommendations bundle loaded");
