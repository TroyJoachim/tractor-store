import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const remoteExploreEntry =
    env.REMOTE_EXPLORE_URL || "http://localhost:4001/remote-entry.js";
  const devOrigin = env.VITE_HOST && env.VITE_PORT
    ? `${env.VITE_HOST}:${env.VITE_PORT}`
    : "http://localhost:4000";
  const devPort = Number(env.VITE_PORT) || 4000;

  return {
    plugins: [
      react(),
      federation({
        name: "shell",
        manifest: true,
        exposes: {},
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
    build: {
      target: "esnext",
      minify: true,
      outDir: "../dist/public",
      emptyOutDir: false,
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
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  };
});
