import { defineConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/portfolio/",
  plugins: [svelte({ preprocess: vitePreprocess() })],
  resolve: {
    alias: {
      $lib: resolve(rootDir, "lib")
    }
  }
});
