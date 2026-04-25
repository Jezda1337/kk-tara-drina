// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "kajakdrina.rs",
  vite: {
    plugins: [tailwindcss(), noExternalPlugin()],
    build: {
      minify: true,
      cssMinify: true,
    },
  },

  trailingSlash: "never",

  i18n: {
    locales: ["rs", "en"],
    defaultLocale: "rs",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Roboto",
      cssVariable: "--font-roboto",
      styles: ["normal", "italic"],
    },
  ],

  adapter: cloudflare(),
  output: "server",
});

function noExternalPlugin() {
  return {
    name: "optimize-dependencies",
    configEnvironment(environment = "server") {
      // We're only interested in server environments
      if (environment !== "client") {
        return {
          optimizeDeps: {
            include: [
              "postcss",
              // Or you can use this syntax if you don't depend directly on a dependency
              // "expressive-code > postcss"
            ],
          },
        };
      }
    },
  };
}
