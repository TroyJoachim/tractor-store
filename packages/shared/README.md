# @tractor-store/shared

Shared utilities for tractor-store micro-frontends.

## Philosophy

This package exports TypeScript source files directly, following a **just-in-time (JIT) compilation** approach. Each consuming application is responsible for compiling the shared code as part of its own build process.

### Benefits

- **No build step required** for the shared package
- **Single source of truth** for shared utilities
- **Better tree-shaking** since the consuming bundler has full access to source
- **Simpler debugging** with direct source access
- **TypeScript support** without separate declaration files

## Usage

### Installation

The package is installed as a workspace dependency:

```json
{
  "dependencies": {
    "@tractor-store/shared": "workspace:*"
  }
}
```

### TypeScript Configuration

To enable type checking of the shared package source, add it to your `tsconfig.json` include paths:

```json
{
  "include": [
    "src/**/*",
    "../../../packages/shared/src/**/*"
  ]
}
```

### Importing

```typescript
import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
```

## API

### `defineReactWebComponent(options)`

Defines a custom element that mounts a React component into its shadow root.

**Options:**

- `component` - The React component to mount
- `cssHref` - The href to the css file
- `tag` - The custom element tag name (must contain a hyphen)
- `dataBoundaryPageAttr` - (optional) Value for adding a data-boundary-page attribute
- `observedAttrs` - (optional) Array of attribute names to observe for changes

**Environment Variables:**

The component uses these Vite environment variables for stylesheet loading:
- `VITE_HOST` - Base URL (default: `http://localhost`)
- `VITE_PORT` - Port number (default: `4001`)

**Example:**

```typescript
import { defineReactWebComponent } from "@tractor-store/shared/react-webcomponent";
import MyComponent from "./MyComponent";

defineReactWebComponent({ component: MyComponent, tag: "my-component" });
```
