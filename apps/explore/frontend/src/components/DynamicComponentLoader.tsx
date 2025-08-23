import React, { useEffect, useState } from "react";
import { useShadowManifestImportMap } from "../hooks/useShadowManifestImportMap";

interface DynamicComponentLoaderProps {
  shadowRoot?: ShadowRoot;
  manifestConfigs: Array<{
    manifestUrl: string;
    baseUrl?: string;
    name?: string;
  }>;
  componentName: string; // Name of the component to load from manifest
}

/**
 * Example component that demonstrates loading and rendering a component
 * dynamically from a manifest within a shadow DOM
 */
const DynamicComponentLoader: React.FC<DynamicComponentLoaderProps> = ({
  shadowRoot,
  manifestConfigs,
  componentName
}) => {
  const [DynamicComponent, setDynamicComponent] = useState<React.ComponentType | null>(null);
  
  const { 
    isLoading, 
    error, 
    manifestsLoaded, 
    importModule 
  } = useShadowManifestImportMap(manifestConfigs, shadowRoot);

  useEffect(() => {
    if (manifestsLoaded && componentName) {
      const loadComponent = async () => {
        try {
          const module = await importModule(componentName);
          // Assume the module exports a default React component
          setDynamicComponent(() => module.default || module);
          console.log(`✅ Dynamically loaded component: ${componentName}`);
        } catch (err) {
          console.error(`❌ Failed to load component: ${componentName}`, err);
        }
      };

      loadComponent();
    }
  }, [manifestsLoaded, componentName, importModule]);

  if (isLoading) {
    return <div>Loading component modules...</div>;
  }

  if (error) {
    return <div>Error loading modules: {error}</div>;
  }

  if (!DynamicComponent) {
    return <div>Component "{componentName}" not found or failed to load</div>;
  }

  return <DynamicComponent />;
};

export default DynamicComponentLoader;
