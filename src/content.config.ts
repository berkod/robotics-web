import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { SPONSOR_TIERS } from "./lib/sponsorTiers";

const robots = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/robots" }),
  schema: z.object({
    year: z.number(),
    name: z.string(),
    photo: z.string(),
    bullets: z.array(z.string()).length(3),
  }),
});

const leadership = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/leadership" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    category: z.enum(["student-leader", "mentor"]),
    subteam: z.string(),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sponsors" }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    tier: z.enum(SPONSOR_TIERS),
    link: z.string().url().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { robots, leadership, sponsors, pages };
