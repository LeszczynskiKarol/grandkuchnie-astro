import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://www.grandkuchnie.pl",
  integrations: [react(), tailwind()],
  output: "static",
  build: {
    assets: "_assets",
  },
});
