/**
 * Shared TypeScript interfaces for the personal portfolio website.
 * All content data files conform to these types.
 */

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  photo: string;
  resumeUrl: string;
  email: string;
  social: {
    linkedin: string;
    github: string;
    whatsapp?: string;
  };
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  verificationUrl?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Service {
  title: string;
  description: string;
  /** Lucide icon name string, e.g. "Code2", "Palette", "Globe" */
  icon: string;
}

export interface Testimonial {
  author: string;
  role: string;
  photo?: string;
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  content: string;
}

/** BlogPost metadata without the full Markdown body — used for listing pages. */
export type BlogPostMeta = Omit<BlogPost, "content">;
