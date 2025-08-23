import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const remoteExploreEntry =
    env.REMOTE_EXPLORE_URL || "http://localhost:4001/remote-entry.js";
  const remoteCheckoutEntry =
    env.REMOTE_CHECKOUT_URL || "http://localhost:4003/remote-entry.js";
  const devOrigin = env.VITE_HOST && env.VITE_PORT
    ? `${env.VITE_HOST}:${env.VITE_PORT}`
    : "http://localhost:4002";
  const devPort = Number(env.VITE_PORT) || 4002;
  const base = mode === "production" ? "http://localhost:3002/" : "/";

  return {
    plugins: [
    react(),
    federation({
      name: "decide",
      filename: "remote-entry.js",
      hostInitInjectLocation: "entry",
      exposes: {
        "./decide-product-page": "./src/client/decide-product-page.tsx",
      },
      remotes: {
        explore: {
          type: "module",
          name: "explore",
          entry: remoteExploreEntry,
          entryGlobalName: "explore",
          shareScope: "default",
        },
        checkout: {
          type: "module",
          name: "checkout",
          entry: remoteCheckoutEntry,
          entryGlobalName: "checkout",
          shareScope: "default",
        },
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        "react/jsx-runtime": {
          singleton: true,
        },
        "react-dom/client": {
          singleton: true,
        },
        "react-router": {
          singleton: true,
        },
      },
    }),
    ],
    base,
    build: {
    outDir: "../dist/public",
    emptyOutDir: false,
    minify: true,
    target: "esnext",
    modulePreload: {
      polyfill: false,
    },
    },
    server: {
      origin: devOrigin,
      port: devPort,
      strictPort: true,
      host: true,
      cors: true,
      proxy: {
        "/api": {
          target: "http://localhost:3002",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
