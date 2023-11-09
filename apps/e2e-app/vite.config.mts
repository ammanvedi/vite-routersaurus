import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import {viteFileRouter} from "@routersaurus/plugin-vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";

export default defineConfig({
  plugins: [
    viteFileRouter(),
    mdx({
      remarkPlugins: [remarkFrontmatter],
    }),
    react(),
  ],
  clearScreen: false
});
