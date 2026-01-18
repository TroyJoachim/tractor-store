import React, { ComponentType } from "react";
import { createRoot, Root } from "react-dom/client";

interface DefineReactWebComponentOptions {
  /** The React component to mount */
  component: ComponentType<Record<string, any>>;
  /** The custom element tag name (must contain a hyphen) */
  tag: string;
  /** Function that returns a promise resolving to CSS content, or CSS href string */
  css: (() => Promise<string>) | string;
  /** Optional value for adding a data-boundary-page attribute */
  dataBoundaryPageAttr?: string;
  /** Optional value for adding a data-boundary attribute */
  dataBoundaryAttr?: string;
  /** Optional array of attribute names to observe for changes */
  observedAttrs?: string[];
}

/**
 * Define a custom element that mounts a React component into its shadow root.
 */
export function defineReactWebComponent({
  component: Comp,
  tag,
  dataBoundaryPageAttr,
  dataBoundaryAttr,
  observedAttrs = [],
  css,
}: DefineReactWebComponentOptions): void {
  if (customElements.get(tag)) return;

  class WC extends HTMLElement {
    private _root: Root | null = null;
    private _props: Record<string, any> = {};

    constructor() {
      super();
      // Only use shadow DOM in production mode
      if (import.meta.env.PROD) {
        this.attachShadow({ mode: "open" });
      }
    }

    connectedCallback(): void {
      // Copy attributes to props
      for (const attr of this.getAttributeNames()) {
        this._props[attr] = this.getAttribute(attr);
      }

      if (!this._root) {
        const container = import.meta.env.PROD ? this.shadowRoot! : this;

        // Inject CSS into shadow root if using shadow DOM
        if (import.meta.env.PROD) {
          const style = document.createElement("style");
          container.appendChild(style);

          if (typeof css === "function") {
            // CSS loader function
            css()
              .then((cssContent) => {
                style.textContent = cssContent;
              })
              .catch((err) => console.error("Failed to load CSS:", err));
          } else {
            // CSS href string
            fetch(css)
              .then((response) => response.text())
              .then((cssContent) => {
                style.textContent = cssContent;
              })
              .catch((err) => console.error("Failed to load CSS:", err));
          }
        }

        const mount = document.createElement("div");

        // For demo only to add the attribute
        if (dataBoundaryPageAttr) {
          mount.setAttribute("data-boundary-page", dataBoundaryPageAttr);
        }
        if (dataBoundaryAttr) {
          mount.setAttribute("data-boundary", dataBoundaryAttr);
        }

        container.appendChild(mount);
        this._root = createRoot(mount);
        this._render();
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
