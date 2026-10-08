import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const robots = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/robots" }),
  schema: z.object({
    year: z.number(),
    name: z.string(),
    photo: z.string(),
    bullets: z.array(z.string()).min(1).max(5),
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

/**
 * A sponsor link is rendered straight into an `href` (see sponsors.astro), so
 * `.url()` alone is not enough: it accepts `javascript:alert(1)`, which would
 * be a stored-XSS vector, along with schemes this site has no use for
 * (`ftp:`, `mailto:`) and schemeless hosts like `https://localhost`.
 *
 * Restricted here to http(s) with a dotted host, mirroring the `pattern` on
 * the link field in public/admin/config.yml. The CMS catches bad input at edit
 * time; this is the build-time backstop for anything committed directly.
 * Keep the two in sync.
 */
const absoluteHttpUrl = z
  .string()
  .refine(
    (value) => {
      let url: URL;
      try {
        url = new URL(value);
      } catch {
        return false;
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") return false;
      // Require a dot so bare hosts (localhost, intranet names) are rejected.
      return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(url.hostname);
    },
    { message: "Must be a full http(s) URL with a dotted host, e.g. https://example.com" },
  );

const sponsors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sponsors" }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    // Decap writes "" (not undefined) when an existing link is cleared in
    // the CMS, rather than never filled in — accept both as "no link".
    link: absoluteHttpUrl.optional().or(z.literal("")),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { robots, leadership, mentors, sponsors, pages };
