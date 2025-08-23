import React, { ComponentType } from "react";
import { createRoot, Root } from "react-dom/client";

interface DefineReactWebComponentOptions {
  /** The React component to mount */
  component: ComponentType<Record<string, any>>;
  /** The custom element tag name (must contain a hyphen) */
  tag: string;
  /** Optional value for adding a data-boundary-page attribute */
  dataBoundaryPageAttr?: string;
  /** Optional value for adding a data-boundary attribute */
  dataBoundaryAttr?: string;
  /** Optional array of attribute names to observe for changes */
  observedAttrs?: string[];
}

/**
 * Define a custom element that mounts a React component into its shadow root.
 * Uses VITE_HOST and VITE_PORT environment variables for stylesheet loading.
 */
export function defineReactWebComponent({
  component: Comp,
  tag,
  dataBoundaryPageAttr,
  dataBoundaryAttr,
  observedAttrs = [],
}: DefineReactWebComponentOptions): void {
  if (customElements.get(tag)) return;

  const HOST = import.meta.env.VITE_HOST || 'http://localhost';
  const PORT = import.meta.env.VITE_PORT || '4000';

  class WC extends HTMLElement {
    private _root: Root | null = null;
    private _props: Record<string, any> = {};

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback(): void {
      // Copy attributes to props
      for (const attr of this.getAttributeNames()) {
        this._props[attr] = this.getAttribute(attr);
      }

      if (!this._root) {
        // Inject CSS into shadow root
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${HOST}:${PORT}/css/index.css`;
        this.shadowRoot!.appendChild(link);

        const mount = document.createElement("div");
        
        // For demo only to add the attribute
        if (dataBoundaryPageAttr) {
          mount.setAttribute('data-boundary-page', dataBoundaryPageAttr);
        }
        if (dataBoundaryAttr) {
          mount.setAttribute('data-boundary', dataBoundaryAttr);
        }

        this.shadowRoot!.appendChild(mount);
        this._root = createRoot(mount);

        // Render after CSS loads
        link.addEventListener("load", () => this._render());
        setTimeout(() => this._render(), 1000); // Fallback
      }
    }

    disconnectedCallback(): void {
      if (this._root) {
        this._root.unmount();
        this._root = null;
      }
    }

    static get observedAttributes(): string[] {
      return observedAttrs;
    }

    attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null
    ): void {
      if (oldValue !== newValue) {
        this._props[name] = newValue;
        this._render();
      }
    }

    private _render(): void {
      if (!this._root) return;
      this._root.render(React.createElement(Comp, { ...this._props }));
    }
  }

  customElements.define(tag, WC);
}
