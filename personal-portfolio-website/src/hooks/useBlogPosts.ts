import type { BlogPost } from "../types";

// Eagerly load all Markdown files from the blog content directory as raw strings.
const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

/**
 * Minimal front-matter parser — no Node.js dependencies.
 * Parses YAML front-matter delimited by "---" lines.
 */
function parseFrontMatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const rawVal = line.slice(colonIdx + 1).trim();

    // Array: ["a", "b"] or [a, b]
    if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
      data[key] = rawVal
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      // Strip surrounding quotes
      data[key] = rawVal.replace(/^["']|["']$/g, "");
    }
  }

  return { data, content };
}

/**
 * Returns all blog posts parsed from Markdown front-matter, sorted by date
 * descending (most recent first).
 */
export function useBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = Object.entries(modules).map(([filePath, raw]) => {
    const fileName = filePath.split("/").pop() ?? filePath;
    const slug = fileName.replace(/\.md$/, "");

    const { data, content } = parseFrontMatter(raw);

    return {
      slug,
      title: (data.title as string) ?? "",
      date: (data.date as string) ?? "",
      excerpt: (data.excerpt as string) ?? "",
      coverImage: (data.coverImage as string) ?? "",
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
