import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const robots = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/robots" }),
  schema: z.object({
    year: z.number(),
    name: z.string(),
    photo: z.string(),
    bullets: z.array(z.object({ bullet: z.string() })).length(3),
  }),
});

// Student leaders and mentors are separate collections so each gets its own
// CMS edit interface, rather than one list split by a category dropdown.
const person = z.object({
  name: z.string(),
  role: z.string(),
  subteam: z.string(),
});

const leadership = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/leadership" }),
  schema: person,
});

const mentors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/mentors" }),
  schema: person,
});

const sponsors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sponsors" }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    // Decap writes "" (not undefined) when an existing link is cleared in
    // the CMS, rather than never filled in — accept both as "no link".
    link: z.string().url().optional().or(z.literal("")),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { robots, leadership, mentors, sponsors, pages };
