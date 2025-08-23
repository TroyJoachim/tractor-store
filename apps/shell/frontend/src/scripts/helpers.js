const teamColors = {
    explore: { stroke: "#FF5A54", text: "#fff" },
    decide: { stroke: "#53FF90", text: "#000" },
    checkout: { stroke: "#FFDE54", text: "#000" },
    inspire: { stroke: "#F64DFF", text: "#fff" },
};

/**
 * Sets the basic styles.
 */
function setBasicStyles() {
    const style = document.createElement("style");
    style.id = "boundaries";
    style.innerHTML = `
:root, :host {
  --boundary-display: none;
}
html.showBoundaries {
  --boundary-display: block;
}

[data-boundary],
[data-boundary-page] {
  position: relative;
}
[data-boundary]::after,
[data-boundary-page]::after {
  content: attr(data-boundary);
  position: absolute;
  bottom: -1.4em;
  right: 0.75rem;
  padding: 0 0.5rem;
  line-height: 1.5;
  font-weight: bold;
  pointer-events: none;
  font-weight: 400;
  font-style: normal;
  border-radius: 0 0 0.5rem 0.5rem;
  color: #fff;
  background-color: #999;
  display: var(--boundary-display);
}
[data-boundary-page]::after {
  top: 250px;
  left: 0rem;
  bottom: auto;
  right: auto;
  transform: rotate(-90deg);
  transform-origin: 0 0;
  content: attr(data-boundary-page);
}

[data-boundary]::before {
  inset: 0;
  position: absolute;
  content: "";
  border: 4px solid #999;
  border-radius: 1rem;
  pointer-events: none;
  display: var(--boundary-display);
}
[data-boundary-page]::before {
  inset: -1rem 0 -2rem;
  position: absolute;
  content: "";
  pointer-events: none;
  border: 6px solid #999;
  display: var(--boundary-display);
}

${["explore", "decide", "checkout", "inspire"]
            .map(
                (team) => `
[data-boundary=${team}]::before,
[data-boundary-page=${team}]::before {
  border-color: ${teamColors[team].stroke};
}
[data-boundary=${team}]::after,
[data-boundary-page=${team}]::after {
  background-color: ${teamColors[team].stroke};
  color: ${teamColors[team].text};
}
`,
            )
            .join("")}

`;
    document.head.appendChild(style);
}

/**
 * Toggle the boundaries based on the active state.
 * @param {boolean} active - The active state of the boundaries.
 */
function toggleBoundaries(active) {
    document.documentElement.classList.toggle("showBoundaries", active);
    window.localStorage.setItem("showBoundaries", active);
    
    // Update CSS variable in all shadow roots (including nested ones)
    updateAllShadowRoots(document, active);
}

/**
 * Recursively update all shadow roots in a root element.
 * @param {Document|ShadowRoot} root - The root to search in.
 * @param {boolean} active - Whether boundaries should be shown.
 */
function updateAllShadowRoots(root, active) {
    root.querySelectorAll("*").forEach((el) => {
        if (el.shadowRoot) {
            updateShadowBoundaryState(el.shadowRoot, active);
            // Recursively update nested shadow roots
            updateAllShadowRoots(el.shadowRoot, active);
        }
    });
}

/**
 * Update the boundary display state in a shadow root.
 * @param {ShadowRoot} shadowRoot - The shadow root to update.
 * @param {boolean} active - Whether boundaries should be shown.
 */
function updateShadowBoundaryState(shadowRoot, active) {
    let stateStyle = shadowRoot.getElementById("boundaries-state");
    if (!stateStyle) {
        stateStyle = document.createElement("style");
        stateStyle.id = "boundaries-state";
        shadowRoot.appendChild(stateStyle);
    }
    stateStyle.textContent = `:host { --boundary-display: ${active ? "block" : "none"}; }`;
}

/**
 * Show toggle button.
 */
function showToggleButton() {
    const showBoundaries =
        window.localStorage.getItem("showBoundaries") === "true";
    toggleBoundaries(showBoundaries);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = showBoundaries;
    checkbox.addEventListener("change", (e) =>
        toggleBoundaries(e.target.checked),
    );

    const checkboxView = document.createElement("div");
    checkboxView.classList.add("toggleView");

    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(checkboxView);
    label.appendChild(document.createTextNode(" show team boundaries"));

    const container = document.createElement("div");
    container.classList.add("showBoundariesToggle");

    const style = document.createElement("style");
    style.innerHTML = `
    .showBoundariesToggle {
      position: fixed; 
      bottom: 10px; 
      left: 10px; 
      border-radius: 10px;
      display: flex;
      background-color: rgba(255, 255, 255, 0.8); 
      -webkit-user-select: none; 
      user-select: none;
      box-shadow: 0 0 20px 10px rgba(235, 91, 89, 0.05);  
      border: 1px solid #eeebe2;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      margin-right: 10px;
    }

    .showBoundariesToggle input {
      display: none;
    }

    .showBoundariesToggle label {
      cursor: pointer;
      padding: 20px; 
      display: flex;
    }

    .toggleView {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-right: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      flex-shrink: 0;
    }

    .toggleView::before {
      content: "";
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, width 0.3s;
    }

    .toggleView::after {
      top: 1px;
      left: 1px;
      position: absolute;
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 10px;
      background-color: #000;
      opacity: 0.5;
      transition: transform 0.3s;
    }

    .showBoundariesToggle label:hover .toggleView::after {
      opacity: 1;
    }

    .showBoundariesToggle input:checked + .toggleView::before {
      width: 38px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background-color: rgba(255, 90, 85, 1);
    }

    .showBoundariesToggle input:checked + .toggleView::after {
      transform: translateX(20px);
      opacity: 1;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  `;
    container.appendChild(style);
    container.appendChild(label);
    document.body.appendChild(container);
}

/**
 * Function to copy styles to shadow root and recursively to nested shadow roots.
 * @param {ShadowRoot} shadowRoot - The shadow root.
 */
function copyStylesToShadow(shadowRoot) {
    const style = document.getElementById("boundaries");
    if (style && shadowRoot && shadowRoot.getElementById("boundaries") === null) {
        shadowRoot.appendChild(style.cloneNode(true));
        // Set the CSS variable based on current boundary state
        const isActive = document.documentElement.classList.contains("showBoundaries");
        updateShadowBoundaryState(shadowRoot, isActive);
    }
    
    // Recursively copy styles to nested shadow roots
    if (shadowRoot) {
        shadowRoot.querySelectorAll("*").forEach((el) => {
            if (el.shadowRoot) {
                copyStylesToShadow(el.shadowRoot);
            }
        });
    }
}

/**
 * Function to handle existing shadow roots.
 */
function handleExistingShadowRoots() {
    document.querySelectorAll("*").forEach((el) => {
        if (el.shadowRoot) {
            copyStylesToShadow(el.shadowRoot);
            // Also check for nested shadow roots
            el.shadowRoot.querySelectorAll("*").forEach((shadowEl) => {
                if (shadowEl.shadowRoot) {
                    copyStylesToShadow(shadowEl.shadowRoot);
                }
            });
        }
    });
}

/**
 * Function to observe a shadow root for new elements with shadow DOMs.
 * @param {ShadowRoot} shadowRoot - The shadow root to observe.
 */
function observeShadowRoot(shadowRoot) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if this element has a shadow root (may be attached later)
                    checkForShadowRoot(node);
                    // Check descendants
                    if (node.querySelectorAll) {
                        node.querySelectorAll("*").forEach(checkForShadowRoot);
                    }
                }
            });
        });
    });
    observer.observe(shadowRoot, {
        childList: true,
        subtree: true,
    });
}

/**
 * Check an element for shadow root and set up observation.
 * Uses a retry mechanism for custom elements that create shadow roots asynchronously.
 * @param {Element} el - The element to check.
 */
function checkForShadowRoot(el) {
    if (el.shadowRoot) {
        copyStylesToShadow(el.shadowRoot);
        observeShadowRoot(el.shadowRoot);
        // Also check for nested shadow roots within this shadow root
        el.shadowRoot.querySelectorAll("*").forEach(checkForShadowRoot);
    } else if (el.tagName && el.tagName.includes("-")) {
        // Custom element without shadow root yet - check again after a short delay
        // Custom elements create their shadow root in connectedCallback
        setTimeout(() => {
            if (el.shadowRoot) {
                copyStylesToShadow(el.shadowRoot);
                observeShadowRoot(el.shadowRoot);
                el.shadowRoot.querySelectorAll("*").forEach(checkForShadowRoot);
            }
        }, 100);
        // Also check after a longer delay for lazy-loaded components
        setTimeout(() => {
            if (el.shadowRoot) {
                copyStylesToShadow(el.shadowRoot);
                observeShadowRoot(el.shadowRoot);
                el.shadowRoot.querySelectorAll("*").forEach(checkForShadowRoot);
            }
        }, 1000);
    }
}

/**
 * Function to watch for shadow roots.
 */
function watchForShadowRoots() {
    // Observe new elements with shadow DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    checkForShadowRoot(node);
                    // Check for custom elements added to the DOM tree
                    if (node.querySelectorAll) {
                        node.querySelectorAll("*").forEach(checkForShadowRoot);
                    }
                }
            });
        });
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
    
    // Also observe existing shadow roots
    document.querySelectorAll("*").forEach((el) => {
        if (el.shadowRoot) {
            observeShadowRoot(el.shadowRoot);
        }
    });
}

/**
 * initialize
 */
setBasicStyles();
showToggleButton();
handleExistingShadowRoots();
watchForShadowRoots();