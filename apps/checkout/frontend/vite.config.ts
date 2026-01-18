import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const remoteExploreEntry =
    env.REMOTE_EXPLORE_URL || "http://localhost:4001/mf-manifest.json";
  const devOrigin =
    env.VITE_HOST && env.VITE_PORT
      ? `${env.VITE_HOST}:${env.VITE_PORT}`
      : "http://localhost:4003";
  const devPort = Number(env.VITE_PORT) || 4003;
  const base = mode === "production" ? "http://localhost:3003/" : "/";

  return {
    plugins: [
      react(),
      federation({
        name: "checkout",
        manifest: true,
        exposes: {
          "./checkout-add-to-cart": "./src/client/checkout-add-to-cart.tsx",
          "./checkout-mini-cart": "./src/client/checkout-mini-cart.tsx",
          "./checkout-cart-page": "./src/client/checkout-cart-page.tsx",
          "./checkout-checkout-page": "./src/client/checkout-checkout-page.tsx",
          "./checkout-thanks-page": "./src/client/checkout-thanks-page.tsx",
        },
        remotes: {
          explore: {
            type: "module",
            name: "explore",
            entry: remoteExploreEntry,
            entryGlobalName: "explore",
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
      // Add all the CSS modules to a single file
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.names?.[0]?.endsWith(".css")) {
              return "assets/checkout.css";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
    server: {
      origin: devOrigin,
      port: devPort,
      strictPort: true,
      host: true,
      cors: {
        origin: true,
        credentials: true,
      },
      proxy: {
        "/api": {
          target: "http://localhost:3003",
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
