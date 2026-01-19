// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updateDate: z.date().optional(),
    author: z.string().default("Grand Kuchnie"),
    category: z.enum([
      "Poradniki",
      "Trendy w kuchniach",
      "Materiały i wykończenia",
      "Aranżacje wnętrz",
      "Projektowanie kuchni",
      "Porady ekspertów",
      "Realizacje",
      "Łazienki i garderoby",
      "FAQ",
      "Trendy i inspiracje",
    ]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Powiązanie z usługą (opcjonalne)
    serviceSlug: z.string().optional(),
    // Powiązanie z miastem (opcjonalne)
    citySlug: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
