import React from 'react';
import { useShadowManifestImportMap } from '../hooks/useShadowManifestImportMap';

interface ShadowModuleComponentProps {
  shadowRoot?: ShadowRoot;
  manifestConfigs?: Array<{
    manifestUrl: string;
    baseUrl?: string;
    name?: string;
  }>;
}

/**
 * Example component that demonstrates shadow-scoped manifest loading
 */
const ShadowModuleComponent: React.FC<ShadowModuleComponentProps> = ({ 
  shadowRoot,
  manifestConfigs = []
}) => {
  const { 
    isLoading, 
    error, 
    manifestsLoaded, 
    moduleRegistry, 
    importModule 
  } = useShadowManifestImportMap(manifestConfigs, shadowRoot);

  const handleImportModule = async (moduleName: string) => {
    try {
      const module = await importModule(moduleName);
      console.log(`Successfully imported module "${moduleName}":`, module);
    } catch (err) {
      console.error(`Failed to import module "${moduleName}":`, err);
    }
  };

  if (isLoading) {
    return <div>Loading manifests...</div>;
  }

  if (error) {
    return <div>Error loading manifests: {error}</div>;
  }

  const availableModules = moduleRegistry?.getAvailableModules() || [];

  return (
    <div>
      <h3>Shadow DOM Module Loader</h3>
      <p>Status: {manifestsLoaded ? 'Manifests loaded successfully' : 'Not loaded'}</p>
      
      {availableModules.length > 0 && (
        <div>
          <h4>Available Modules:</h4>
          <ul>
            {availableModules.map(moduleName => (
              <li key={moduleName}>
                {moduleName}
                <button 
                  onClick={() => handleImportModule(moduleName)}
                  style={{ marginLeft: '10px' }}
                >
                  Import
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {availableModules.length === 0 && manifestsLoaded && (
        <p>No modules found in manifests</p>
      )}
    </div>
  );
};

export default ShadowModuleComponent;
