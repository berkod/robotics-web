import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const robots = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/robots" }),
  schema: z.object({
    year: z.number(),
    name: z.string(),
    photo: z.string(),
    bullets: z.array(z.string()).length(3),
  }),
});

export const collections = { robots };
