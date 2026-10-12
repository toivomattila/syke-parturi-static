import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://sykeparturi.datato.fi",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/.well-known/webmcp.json") &&
        !page.endsWith("/.well-known/ai-catalog.json"),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
