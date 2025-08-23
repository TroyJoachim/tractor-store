import { useEffect, useState, useRef } from "react";
import { ShadowModuleRegistry, getShadowModuleRegistry } from "../utils/shadowModuleLoader";

interface ManifestEntry {
  file: string;
  name?: string;
  src?: string;
  isEntry?: boolean;
  imports?: string[];
  css?: string[];
}

interface Manifest {
  [key: string]: ManifestEntry;
}

interface ManifestConfig {
  manifestUrl: string;
  baseUrl?: string;
  name?: string; // Optional name to identify this manifest
}

interface UseShadowManifestResult {
  isLoading: boolean;
  error: string | null;
  manifestsLoaded: boolean;
  moduleRegistry: ShadowModuleRegistry | null;
  importModule: (moduleName: string) => Promise<any>;
}

/**
 * Custom hook that downloads manifests and creates a scoped module registry for the current shadow DOM
 * @param manifests Array of manifest configurations to load
 * @param shadowRoot The shadow root to scope modules to (if not provided, will try to find it)
 * @returns Object containing loading state, error, and module registry
 */
export const useShadowManifestImportMap = (
  manifests: ManifestConfig[],
  shadowRoot?: ShadowRoot
): UseShadowManifestResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [manifestsLoaded, setManifestsLoaded] = useState(false);
  const [moduleRegistry, setModuleRegistry] = useState<ShadowModuleRegistry | null>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);

  // Find the shadow root if not provided
  useEffect(() => {
    if (shadowRoot) {
      shadowRootRef.current = shadowRoot;
    } else {
      // Try to find the shadow root by walking up the DOM
      const findShadowRoot = (element: Element | null): ShadowRoot | null => {
        if (!element) return null;
        if (element.shadowRoot) return element.shadowRoot;
        if ((element as any).getRootNode) {
          const root = (element as any).getRootNode();
          if (root instanceof ShadowRoot) return root;
        }
        return findShadowRoot(element.parentElement);
      };

      // Use a timeout to allow the component to mount and find its shadow root
      const timeout = setTimeout(() => {
        const container = document.querySelector('[data-react-shadow-root]');
        if (container) {
          shadowRootRef.current = findShadowRoot(container);
        }
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [shadowRoot]);

  useEffect(() => {
    let cancelled = false;

    const loadManifests = async () => {
      if (!shadowRootRef.current) {
        setError('Shadow root not found');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log(`Loading ${manifests.length} manifest(s) for shadow DOM...`);
        
        const registry = getShadowModuleRegistry(shadowRootRef.current);
        setModuleRegistry(registry);
        
        await registry.loadMultipleManifests(manifests);
        
        if (cancelled) return;

        setManifestsLoaded(true);
        setIsLoading(false);
        
        console.log(`✅ All ${manifests.length} manifest(s) loaded successfully for shadow DOM`);
      } catch (err) {
        if (cancelled) return;
        
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        setIsLoading(false);
        console.error('❌ Failed to load manifest(s) for shadow DOM:', err);
      }
    };

    loadManifests();

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(manifests), shadowRootRef.current]);

  const importModule = async (moduleName: string): Promise<any> => {
    if (!moduleRegistry) {
      throw new Error('Module registry not initialized');
    }
    return moduleRegistry.importModule(moduleName);
  };

  return {
    isLoading,
    error,
    manifestsLoaded,
    moduleRegistry,
    importModule
  };
};

export default useShadowManifestImportMap;
