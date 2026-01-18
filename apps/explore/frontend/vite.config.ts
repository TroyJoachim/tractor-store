import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const remoteDecideEntry =
    env.REMOTE_DECIDE_URL || "http://localhost:4002/mf-manifest.json";
  const remoteCheckoutEntry =
    env.REMOTE_CHECKOUT_URL || "http://localhost:4003/mf-manifest.json";
  const devOrigin = env.VITE_HOST && env.VITE_PORT
    ? `${env.VITE_HOST}:${env.VITE_PORT}`
    : "http://localhost:4001";
  const devPort = Number(env.VITE_PORT) || 4001;
  const base = mode === "production" ? "http://localhost:3001/" : "/";

  return {
    plugins: [
      react(),
      federation({
        name: "explore",
        manifest: true,
        exposes: {
          "./explore-home-page": "./src/client/explore-home-page.tsx",
          "./explore-recommendations": "./src/client/explore-recommendations.tsx",
          "./explore-storepicker": "./src/client/explore-storepicker.tsx",
        },
        remotes: {
          decide: {
            type: "module",
            name: "decide",
            entry: remoteDecideEntry,
            entryGlobalName: "decide",
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
      // Add all the CSS modules to a single file
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.names?.[0]?.endsWith('.css')) {
              return 'assets/explore.css';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
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
          target: "http://localhost:3001",
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
