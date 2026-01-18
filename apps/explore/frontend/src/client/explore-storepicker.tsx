import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import { useState, useEffect } from "react";
import { StorePicker } from "../components/StorePicker";
import { fetchData } from "@tractor-store/shared";

const HOST = import.meta.env.VITE_HOST || 'http://localhost';
const PORT = import.meta.env.VITE_PORT || '4001';

const StorePickerCe = () => {
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
defineReactWebComponent({
  component: StorePickerCe,
  css: `${HOST}:${PORT}/assets/explore.css`,
  tag: "explore-storepicker"
});

const WebComponent = () => <explore-storepicker></explore-storepicker>;
export default WebComponent;

console.log("explore-storepicker bundle loaded");
