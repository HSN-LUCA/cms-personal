# Technical Design Document

## Personal Portfolio Website

---

## 1. Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, optimized production builds, zero-config Vercel deployment |
| Styling | Tailwind CSS v3 | Utility-first, responsive breakpoints, dark-mode via `class` strategy |
| UI Components | shadcn/ui | Accessible, unstyled-by-default, composable with Tailwind |
| Animations | Framer Motion | Declarative enter/exit animations, `useReducedMotion` hook built-in |
| Icons | Lucide React | Tree-shakeable, consistent stroke-based icon set |
| Routing | React Router v6 | Client-side routing for blog post detail pages |
| Blog parsing | gray-matter + react-markdown | Front-matter extraction + Markdown-to-JSX rendering |
| Form handling | React Hook Form + Zod | Schema validation, minimal re-renders |
| Contact delivery | Formspree (default) / EmailJS | No backend required |
| Analytics | Plausible Analytics (default) | Cookieless, GDPR-friendly; GA4 as alternative |
| Newsletter | Mailchimp Embedded Form / ConvertKit API | Email list management |
| Deployment | Vercel | Git-push CI/CD, edge CDN, free tier |

---

## 2. Folder Structure

```
personal-portfolio-website/
├── public/
│   ├── resume.pdf                  # Owner's CV (Resume_Download)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.ico
├── src/
│   ├── assets/                     # Static images (profile photo, project thumbnails, etc.)
│   │   └── images/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Navigation + hamburger + theme toggle
│   │   │   └── Footer.tsx          # Social links + copyright
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── NewsletterSection.tsx
│   │   ├── ui/                     # shadcn/ui generated components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── badge.tsx
│   │   └── shared/
│   │       ├── SectionWrapper.tsx  # Framer Motion scroll-reveal wrapper
│   │       ├── ThemeToggle.tsx     # Dark/light toggle button
│   │       ├── SocialLinks.tsx     # Reusable social icon links
│   │       └── StructuredData.tsx  # JSON-LD Person + WebSite injection
│   ├── content/                    # Admin-friendly Content_Data_Files
│   │   ├── profile.json            # Owner name, title, bio, photo, social URLs
│   │   ├── skills.json
│   │   ├── experience.json
│   │   ├── certifications.json
│   │   ├── projects.json
│   │   ├── services.json
│   │   ├── testimonials.json
│   │   └── blog/
│   │       ├── post-slug-1.md      # Individual blog posts (front-matter + body)
│   │       └── post-slug-2.md
│   ├── hooks/
│   │   ├── useTheme.ts             # localStorage + prefers-color-scheme logic
│   │   ├── useActiveSection.ts     # IntersectionObserver for nav highlighting
│   │   └── useBlogPosts.ts         # Loads and parses Markdown blog files
│   ├── lib/
│   │   ├── analytics.ts            # Analytics initialisation (Plausible / GA4)
│   │   └── utils.ts                # shadcn/ui cn() helper + misc utilities
│   ├── pages/
│   │   ├── HomePage.tsx            # Assembles all sections in order
│   │   └── BlogPostPage.tsx        # Full blog post view
│   ├── types/
│   │   └── index.ts                # Shared TypeScript interfaces
│   ├── App.tsx                     # Router setup
│   ├── main.tsx                    # React DOM entry point + analytics init
│   └── index.css                   # Tailwind directives + CSS custom properties
├── .env.example                    # Documents required environment variables
├── index.html                      # Vite HTML entry (meta tags, JSON-LD)
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── vercel.json                     # Rewrite rules for SPA routing
```

---

## 3. Data Models

All content is stored in `src/content/` as JSON or Markdown files. Components import these files directly; Vite resolves them at build time.

### 3.1 `profile.json`

```json
{
  "name": "string",
  "title": "string",
  "tagline": "string",
  "bio": "string",
  "photo": "string (asset path)",
  "resumeUrl": "/resume.pdf",
  "email": "string",
  "social": {
    "linkedin": "string (URL)",
    "github": "string (URL)",
    "whatsapp": "string (phone number, optional)"
  }
}
```

### 3.2 `skills.json`

```json
[
  {
    "category": "string",
    "items": [
      { "name": "string", "level": "beginner | intermediate | advanced | expert" }
    ]
  }
]
```

### 3.3 `experience.json`

```json
[
  {
    "title": "string",
    "company": "string",
    "startDate": "YYYY-MM",
    "endDate": "YYYY-MM | null",
    "description": "string"
  }
]
```

Entries are sorted descending by `startDate` at render time.

### 3.4 `certifications.json`

```json
[
  {
    "name": "string",
    "issuer": "string",
    "issueDate": "YYYY-MM",
    "verificationUrl": "string (URL, optional)"
  }
]
```

### 3.5 `projects.json`

```json
[
  {
    "title": "string",
    "description": "string",
    "tags": ["string"],
    "thumbnail": "string (asset path)",
    "demoUrl": "string (URL, optional)",
    "repoUrl": "string (URL, optional)"
  }
]
```

### 3.6 `services.json`

```json
[
  {
    "title": "string",
    "description": "string",
    "icon": "string (Lucide icon name)"
  }
]
```

### 3.7 `testimonials.json`

```json
[
  {
    "author": "string",
    "role": "string",
    "photo": "string (asset path, optional)",
    "text": "string"
  }
]
```

### 3.8 Blog Post Markdown Front-Matter

Each file in `src/content/blog/` uses the following front-matter schema:

```markdown
---
title: "string"
date: "YYYY-MM-DD"
excerpt: "string"
coverImage: "string (asset path)"
tags: ["string"]
---

Full post body in Markdown...
```

The `useBlogPosts` hook uses `gray-matter` to parse front-matter and exposes a `BlogPost` type:

```typescript
interface BlogPost {
  slug: string;        // derived from filename
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  content: string;     // raw Markdown body
}
```

---

## 4. Component Architecture

### 4.1 Theme System

Theme is managed via a `useTheme` hook and a React context provider wrapping the entire app.

```
ThemeProvider (context)
  └── reads localStorage key "portfolio-theme"
  └── falls back to window.matchMedia("prefers-color-scheme")
  └── applies "dark" class to <html> element (Tailwind dark-mode: "class")
  └── exposes { theme, toggleTheme }
```

`ThemeToggle.tsx` consumes the context and renders a sun/moon icon button in the Navbar.

### 4.2 Navigation & Active Section

`useActiveSection` uses `IntersectionObserver` to track which section id is currently in the viewport. The Navbar receives the active section id as a prop and applies a highlight class to the matching link.

### 4.3 Section Scroll Animation

`SectionWrapper.tsx` wraps every section with a Framer Motion `motion.section` that fades and slides in when it enters the viewport:

```tsx
const SectionWrapper = ({ children, id }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
};
```

### 4.4 Structured Data

`StructuredData.tsx` renders two `<script type="application/ld+json">` tags injected into `<head>` via `react-helmet-async`:

- `Person` schema: name, jobTitle, url, sameAs (social URLs)
- `WebSite` schema: name, url

### 4.5 Analytics Initialisation

`src/lib/analytics.ts` exports an `initAnalytics()` function called once in `main.tsx`. For Plausible, it injects the script tag dynamically. For GA4, it loads `gtag.js` and fires `config`. The active provider is selected via the `VITE_ANALYTICS_PROVIDER` environment variable.

---

## 5. Routing

React Router v6 is used for client-side navigation.

```
/                   → HomePage (all sections)
/blog/:slug         → BlogPostPage (full post)
*                   → Redirect to /
```

`vercel.json` rewrites all paths to `index.html` to support SPA navigation:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 6. Contact Form Flow

```
Visitor fills form
  → React Hook Form validates (Zod schema)
  → On valid submit: POST to Formspree endpoint (VITE_FORMSPREE_ENDPOINT)
  → On success: show success toast / inline message
  → On error: show retry message
```

All credentials are read from `import.meta.env.VITE_*` variables, never hardcoded.

---

## 7. Newsletter Subscription Flow

```
Visitor enters email
  → Zod validates email format
  → POST to Mailchimp API proxy or ConvertKit form endpoint (VITE_NEWSLETTER_ENDPOINT)
  → On success: show confirmation message
  → On error: show retry message
```

A brief data-use notice and privacy policy link are rendered adjacent to the form.

---

## 8. SEO Implementation

| Concern | Implementation |
|---|---|
| `<title>` & `<meta description>` | `react-helmet-async` per page |
| Open Graph tags | `react-helmet-async` in `HomePage` and `BlogPostPage` |
| Semantic HTML | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| `robots.txt` | Static file in `public/` |
| `sitemap.xml` | Static file in `public/` (updated manually or via build script) |
| JSON-LD | `StructuredData.tsx` component |

---

## 9. Deployment Pipeline

```
Developer pushes to main branch on GitHub
  → Vercel GitHub integration triggers build
  → Vercel runs: npm ci && npm run build (vite build)
  → Build output: dist/
  → Vercel deploys dist/ to edge CDN
  → Live URL updated within ~2 minutes
```

### Environment Variables (set in Vercel dashboard)

| Variable | Purpose |
|---|---|
| `VITE_FORMSPREE_ENDPOINT` | Formspree form URL |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID (if using EmailJS) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_ANALYTICS_PROVIDER` | `"plausible"` or `"ga4"` |
| `VITE_PLAUSIBLE_DOMAIN` | Domain registered in Plausible |
| `VITE_GA4_MEASUREMENT_ID` | GA4 measurement ID (G-XXXXXXXX) |
| `VITE_NEWSLETTER_ENDPOINT` | Mailchimp / ConvertKit endpoint URL |

All variables are documented in `.env.example` with placeholder values.

---

## 10. Content Management Workflow

The Owner can update portfolio content by editing files in `src/content/` without touching any React component:

1. **Projects** → edit `src/content/projects.json`
2. **Experience** → edit `src/content/experience.json`
3. **Certifications** → edit `src/content/certifications.json`
4. **Skills** → edit `src/content/skills.json`
5. **Services** → edit `src/content/services.json`
6. **Testimonials** → edit `src/content/testimonials.json`
7. **Blog posts** → add/edit `.md` files in `src/content/blog/`
8. **Personal info & social links** → edit `src/content/profile.json`
9. **Resume** → replace `public/resume.pdf`

After editing, commit and push to `main`. Vercel rebuilds and deploys automatically.

A `CONTENT_GUIDE.md` file at the project root documents each data file's schema with examples.

---

## 11. Performance Strategy

| Technique | Implementation |
|---|---|
| Code splitting | React Router lazy-loads `BlogPostPage` |
| Image lazy loading | Native `loading="lazy"` on all `<img>` below the fold |
| Asset optimisation | Vite processes and hashes static assets; Vercel serves with long-lived cache headers |
| Bundle analysis | `vite-bundle-visualizer` (dev dependency) for monitoring bundle size |
| Font loading | System font stack or `font-display: swap` for any web fonts |

---

## 12. Accessibility Strategy

- All interactive elements have visible focus rings (Tailwind `focus-visible:ring`)
- `aria-label` on icon-only buttons (theme toggle, social links, hamburger)
- `aria-current="page"` on active nav link
- `role="dialog"` and focus trap on mobile nav drawer
- Color contrast validated in both dark and light themes
- `useReducedMotion()` disables Framer Motion animations when OS setting is active
