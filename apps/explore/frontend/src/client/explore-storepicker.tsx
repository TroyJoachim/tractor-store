import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { useState, useEffect } from "react";
import { StorePicker } from "../components/StorePicker";
import { fetchData } from "@tractor-store/shared";

const StorePickerCe: React.FC = () => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const run = async () => {
      const data = await fetchData("/stores");
      setState(data);
    };
    run();
  }, []);

  return <StorePicker {...state} />;
};

// register storepicker as web component
defineReactWebComponent({ component: StorePickerCe, tag: "explore-storepicker" });

const WebComponent = () => <explore-storepicker></explore-storepicker>;
export default WebComponent;

console.log("explore-storepicker bundle loaded");
