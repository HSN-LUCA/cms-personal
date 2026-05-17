# Content Guide

This guide explains how to update every piece of content on your portfolio site without touching any React component. All content lives in `src/content/` as JSON or Markdown files. After editing, commit and push to `main` — Vercel rebuilds and deploys automatically.

---

## Table of Contents

1. [Personal Info — `profile.json`](#1-personal-info--profilejson)
2. [Skills — `skills.json`](#2-skills--skillsjson)
3. [Work Experience — `experience.json`](#3-work-experience--experiencejson)
4. [Certifications — `certifications.json`](#4-certifications--certificationsjson)
5. [Projects — `projects.json`](#5-projects--projectsjson)
6. [Services — `services.json`](#6-services--servicesjson)
7. [Testimonials — `testimonials.json`](#7-testimonials--testimonialsjson)
8. [Blog Posts — `src/content/blog/*.md`](#8-blog-posts--srccontentblogmd)
9. [Resume PDF](#9-resume-pdf)
10. [Placeholder Images](#10-placeholder-images)

---

## 1. Personal Info — `profile.json`

**File:** `src/content/profile.json`

This file drives the Hero section, About section, Navbar resume link, Footer social links, and the JSON-LD structured data injected into `<head>`.

### Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | ✅ | Your full name |
| `title` | string | ✅ | Professional title shown under your name |
| `tagline` | string | ✅ | One-line value proposition shown in the Hero |
| `bio` | string | ✅ | Multi-paragraph biography for the About section. Use `\n\n` for paragraph breaks |
| `photo` | string | ✅ | Path to your profile photo (e.g. `/src/assets/images/profile.jpg`) |
| `resumeUrl` | string | ✅ | Path to your resume PDF (e.g. `/resume.pdf`) |
| `email` | string | ✅ | Contact email address |
| `social.linkedin` | string | ✅ | Full LinkedIn profile URL |
| `social.github` | string | ✅ | Full GitHub profile URL |
| `social.whatsapp` | string | ❌ | Phone number in international format (e.g. `+15551234567`). Omit the field to hide the WhatsApp link |

### Example

```json
{
  "name": "Alex Rivera",
  "title": "Full-Stack Software Engineer",
  "tagline": "Building elegant, performant web experiences from idea to deployment.",
  "bio": "I'm a full-stack software engineer with over six years of experience...\n\nOutside of work, I contribute to open-source projects...",
  "photo": "/src/assets/images/profile.jpg",
  "resumeUrl": "/resume.pdf",
  "email": "alex.rivera@example.com",
  "social": {
    "linkedin": "https://www.linkedin.com/in/alex-rivera-dev",
    "github": "https://github.com/alex-rivera-dev",
    "whatsapp": "+15551234567"
  }
}
```

---

## 2. Skills — `skills.json`

**File:** `src/content/skills.json`

An array of skill categories. Each category renders as a group heading with skill badges beneath it.

### Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `category` | string | ✅ | Group heading (e.g. "Frontend", "Backend") |
| `items` | array | ✅ | List of skills in this category |
| `items[].name` | string | ✅ | Skill name |
| `items[].level` | string | ✅ | One of: `beginner`, `intermediate`, `advanced`, `expert` |

### Example

```json
[
  {
    "category": "Frontend",
    "items": [
      { "name": "React", "level": "expert" },
      { "name": "TypeScript", "level": "expert" },
      { "name": "Tailwind CSS", "level": "advanced" }
    ]
  },
  {
    "category": "Backend",
    "items": [
      { "name": "Node.js", "level": "advanced" },
      { "name": "PostgreSQL", "level": "intermediate" }
    ]
  }
]
```

**Tips:**
- Add as many categories as you like.
- Order categories in the array to control display order.
- The `level` field controls the visual indicator (badge colour or progress bar fill).

---

## 3. Work Experience — `experience.json`

**File:** `src/content/experience.json`

An array of work history entries. The component sorts them by `startDate` descending (most recent first), so order in the file does not matter.

### Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Job title |
| `company` | string | ✅ | Employer name |
| `startDate` | string | ✅ | Start month in `YYYY-MM` format |
| `endDate` | string \| null | ✅ | End month in `YYYY-MM` format, or `null` for current role |
| `description` | string | ✅ | Role summary and key achievements |

### Example

```json
[
  {
    "title": "Senior Frontend Engineer",
    "company": "Luminary Labs",
    "startDate": "2022-03",
    "endDate": null,
    "description": "Lead the frontend architecture for a SaaS analytics platform serving 50,000+ monthly active users."
  },
  {
    "title": "Full-Stack Engineer",
    "company": "Nexbridge Technologies",
    "startDate": "2019-07",
    "endDate": "2022-02",
    "description": "Built and maintained customer-facing features for a B2B logistics platform."
  }
]
```

**Tips:**
- Set `endDate` to `null` (not the string `"null"`) for your current position — the UI will display "Present".
- Dates must be in `YYYY-MM` format (e.g. `"2023-01"`, not `"January 2023"`).

---

## 4. Certifications — `certifications.json`

**File:** `src/content/certifications.json`

An array of professional certifications or courses.

### Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | ✅ | Certification name |
| `issuer` | string | ✅ | Issuing organisation |
| `issueDate` | string | ✅ | Issue month in `YYYY-MM` format |
| `verificationUrl` | string | ❌ | URL to verify the credential (e.g. Credly badge). Omit to hide the verification link |

### Example

```json
[
  {
    "name": "AWS Certified Developer – Associate",
    "issuer": "Amazon Web Services",
    "issueDate": "2023-05",
    "verificationUrl": "https://www.credly.com/badges/your-badge-id"
  },
  {
    "name": "Professional Scrum Master I (PSM I)",
    "issuer": "Scrum.org",
    "issueDate": "2022-11"
  }
]
```

---

## 5. Projects — `projects.json`

**File:** `src/content/projects.json`

An array of portfolio projects displayed in the Projects section.

### Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Project name |
| `description` | string | ✅ | Short description of what the project does and the tech used |
| `tags` | string[] | ✅ | Technology tags shown as badges (e.g. `["React", "TypeScript"]`) |
| `thumbnail` | string | ✅ | Path to the project thumbnail image (e.g. `/src/assets/images/project-1.jpg`) |
| `demoUrl` | string | ❌ | Live demo URL. Omit to hide the demo button |
| `repoUrl` | string | ❌ | Source code URL (GitHub, GitLab, etc.). Omit to hide the repo button |

### Example

```json
[
  {
    "title": "Trackify – Shipment Tracking Dashboard",
    "description": "A real-time logistics dashboard built with React, TypeScript, and WebSockets.",
    "tags": ["React", "TypeScript", "WebSockets", "Node.js"],
    "thumbnail": "/src/assets/images/project-1.jpg",
    "demoUrl": "https://trackify-demo.example.com",
    "repoUrl": "https://github.com/yourname/trackify"
  }
]
```

**Tips:**
- Projects are displayed in the order they appear in the array. Put your best work first.
- Add a new 600×400 px (or similar aspect ratio) image to `src/assets/images/` and reference it in `thumbnail`.

---

## 6. Services — `services.json`

**File:** `src/content/services.json`

An array of services you offer, displayed as cards with icons.

### Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Service name |
| `description` | string | ✅ | Brief description of the service |
| `icon` | string | ✅ | A valid [Lucide React](https://lucide.dev/icons/) icon name in PascalCase (e.g. `"Code2"`, `"Database"`, `"Globe"`) |

### Example

```json
[
  {
    "title": "Web Application Development",
    "description": "End-to-end development of responsive, performant web applications using React and TypeScript.",
    "icon": "Code2"
  },
  {
    "title": "API & Backend Development",
    "description": "Design and implementation of RESTful and GraphQL APIs using Node.js.",
    "icon": "Database"
  }
]
```

**Tips:**
- Browse available icon names at [lucide.dev/icons](https://lucide.dev/icons/). Use the exact PascalCase name shown on the site (e.g. `"LayoutDashboard"`, `"Smartphone"`).
- If an icon name is wrong, the component will fall back gracefully — check the browser console for warnings.

---

## 7. Testimonials — `testimonials.json`

**File:** `src/content/testimonials.json`

An array of testimonials from colleagues, clients, or collaborators.

### Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `author` | string | ✅ | Person's full name |
| `role` | string | ✅ | Their job title and company |
| `text` | string | ✅ | The testimonial quote |
| `photo` | string | ❌ | Path to their headshot image. Omit to show a placeholder avatar |

### Example

```json
[
  {
    "author": "Sarah Chen",
    "role": "Head of Product at Luminary Labs",
    "photo": "/src/assets/images/sarah-chen.jpg",
    "text": "Alex is one of the most thoughtful engineers I've worked with. They have a rare ability to deeply understand product requirements and translate them into clean, maintainable code."
  },
  {
    "author": "Marcus Okafor",
    "role": "CTO at Nexbridge Technologies",
    "text": "We brought Alex in to help us modernize a legacy React codebase, and the results exceeded our expectations."
  }
]
```

---

## 8. Blog Posts — `src/content/blog/*.md`

**Directory:** `src/content/blog/`

Each `.md` file in this directory becomes a blog post. The filename (without `.md`) becomes the URL slug — e.g. `my-first-post.md` is accessible at `/blog/my-first-post`.

### Front-Matter Schema

Every post must start with a YAML front-matter block delimited by `---`:

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Post title shown in the card and `<title>` tag |
| `date` | string | ✅ | Publication date in `YYYY-MM-DD` format |
| `excerpt` | string | ✅ | Short summary shown on the blog card (1–2 sentences) |
| `coverImage` | string | ✅ | Path to the cover image (e.g. `/src/assets/images/blog-1.jpg`) |
| `tags` | string[] | ✅ | Topic tags shown on the card |

### Example

```markdown
---
title: "Why I Migrated from Create React App to Vite"
date: "2024-03-15"
excerpt: "After years of tolerating slow cold starts, I finally made the switch. Here's what I learned."
coverImage: "/src/assets/images/blog-1.jpg"
tags: ["React", "Vite", "Performance"]
---

## Introduction

Your post body goes here in standard Markdown...

## Section Heading

More content with **bold**, _italic_, `inline code`, and [links](https://example.com).

\`\`\`typescript
// Code blocks with syntax highlighting
const greeting = "Hello, world!";
\`\`\`
```

### Adding a New Post

1. Create a new file in `src/content/blog/` with a kebab-case filename, e.g. `my-new-post.md`.
2. Add the front-matter block at the top (all five fields are required).
3. Write the post body in Markdown below the closing `---`.
4. Add a cover image to `src/assets/images/` and reference it in `coverImage`.
5. Commit and push — the post will appear in the Blog section and be accessible at `/blog/my-new-post`.

### Editing an Existing Post

Open the `.md` file and edit the front-matter or body directly. The slug (URL) is derived from the filename, so **do not rename the file** if you want to preserve existing links.

### Removing a Post

Delete the `.md` file. The post will disappear from the Blog section and its URL will redirect to the home page.

---

## 9. Resume PDF

**File:** `public/resume.pdf`

Replace this file with your up-to-date CV. Keep the filename `resume.pdf` so the existing download links continue to work. The file is served directly by Vercel and is not processed by Vite.

**Steps:**
1. Export your CV as a PDF.
2. Rename it to `resume.pdf`.
3. Replace `public/resume.pdf` with the new file.
4. Commit and push.

---

## 10. Placeholder Images

All images live in `src/assets/images/`. The following files are used by the default content:

| File | Used by | Recommended size |
|---|---|---|
| `profile.jpg` | Hero, About, Testimonials | 400×400 px (square) |
| `project-1.jpg` | Projects section | 600×400 px (3:2) |
| `project-2.jpg` | Projects section | 600×400 px (3:2) |
| `project-3.jpg` | Projects section | 600×400 px (3:2) |
| `blog-1.jpg` | Blog section | 800×450 px (16:9) |
| `blog-2.jpg` | Blog section | 800×450 px (16:9) |

### Replacing an Image

1. Prepare your image at the recommended size and save it as a `.jpg` or `.png`.
2. Place it in `src/assets/images/`.
3. Update the relevant JSON or Markdown file to reference the new path (e.g. `/src/assets/images/my-new-image.jpg`).
4. Commit and push.

### Adding a New Image

Add the file to `src/assets/images/` and reference it in the appropriate content file using the path `/src/assets/images/your-image.jpg`.

> **Note:** Vite processes and hashes images at build time for optimal caching. Always reference images via their path string in content files rather than importing them directly in JSON.
