interface ManifestEntry {
  file: string;
  name?: string;
  src?: string;
  isEntry?: boolean;
  imports?: string[];
}

interface Manifest {
  [key: string]: ManifestEntry;
}

interface LoadManifestOptions {
  manifestUrl: string;
  baseUrl?: string;
}

/**
 * A module registry scoped to a specific shadow root
 */
export class ShadowModuleRegistry {
  private moduleCache: Map<string, Promise<any>> = new Map();
  private manifestData: Map<string, ManifestEntry> = new Map();
  private shadowRoot: ShadowRoot;

  constructor(shadowRoot: ShadowRoot) {
    this.shadowRoot = shadowRoot;
  }

  /**
   * Load a manifest and register its modules
   */
  async loadManifest({ manifestUrl, baseUrl = '' }: LoadManifestOptions): Promise<Manifest> {
    try {
      console.log(`📥 Loading manifest from: ${manifestUrl} for shadow DOM`);
      
      const response = await fetch(manifestUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch manifest from ${manifestUrl}: ${response.status} ${response.statusText}`);
      }

      const manifestData: Manifest = await response.json();
      console.log(`✅ Manifest loaded from ${manifestUrl}:`, Object.keys(manifestData).length, 'entries');

      // Register modules in this shadow DOM's registry
      Object.entries(manifestData).forEach(([key, entry]) => {
        if (entry.name && entry.file) {
          this.manifestData.set(entry.name, { ...entry, file: `${baseUrl}${entry.file}` });
        }
        
        if (entry.isEntry && entry.src) {
          this.manifestData.set(entry.src, { ...entry, file: `${baseUrl}${entry.file}` });
        }
      });

      console.log(`📦 Registered ${this.manifestData.size} modules in shadow DOM`);
      
      return manifestData;
    } catch (error) {
      console.error(`❌ Failed to load manifest from ${manifestUrl}:`, error);
      throw error;
    }
  }

  /**
   * Load multiple manifests for this shadow root
   */
  async loadMultipleManifests(manifestConfigs: LoadManifestOptions[]): Promise<Manifest[]> {
    try {
      console.log(`Loading ${manifestConfigs.length} manifests for shadow DOM...`);
      
      const manifestPromises = manifestConfigs.map(config => this.loadManifest(config));
      const manifests = await Promise.all(manifestPromises);
      
      console.log('✅ All manifests loaded successfully for shadow DOM');
      return manifests;
    } catch (error) {
      console.error('❌ Failed to load one or more manifests for shadow DOM:', error);
      throw error;
    }
  }

  /**
   * Dynamically import a module by name
   */
  async importModule(moduleName: string): Promise<any> {
    if (this.moduleCache.has(moduleName)) {
      return this.moduleCache.get(moduleName)!;
    }

    const manifestEntry = this.manifestData.get(moduleName);
    if (!manifestEntry) {
      throw new Error(`Module "${moduleName}" not found in manifest`);
    }

    const modulePromise = import(manifestEntry.file);
    this.moduleCache.set(moduleName, modulePromise);
    
    return modulePromise;
  }

  /**
   * Check if a module is available
   */
  hasModule(moduleName: string): boolean {
    return this.manifestData.has(moduleName);
  }

  /**
   * Get all available module names
   */
  getAvailableModules(): string[] {
    return Array.from(this.manifestData.keys());
  }

  /**
   * Clear the module cache and manifest data
   */
  clear(): void {
    this.moduleCache.clear();
    this.manifestData.clear();
    
    console.log('🧹 Shadow module registry cleared');
  }
}

/**
 * Global registry to track module registries per shadow root
 */
const shadowRegistries = new WeakMap<ShadowRoot, ShadowModuleRegistry>();

/**
 * Get or create a module registry for a shadow root
 */
export function getShadowModuleRegistry(shadowRoot: ShadowRoot): ShadowModuleRegistry {
  if (!shadowRegistries.has(shadowRoot)) {
    shadowRegistries.set(shadowRoot, new ShadowModuleRegistry(shadowRoot));
  }
  return shadowRegistries.get(shadowRoot)!;
}

/**
 * Helper function to load manifests for a specific shadow root
 */
export async function loadManifestsForShadowRoot(
  shadowRoot: ShadowRoot,
  manifestConfigs: LoadManifestOptions[]
): Promise<Manifest[]> {
  const registry = getShadowModuleRegistry(shadowRoot);
  return registry.loadMultipleManifests(manifestConfigs);
}
