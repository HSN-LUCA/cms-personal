# Implementation Plan: Personal Portfolio Website

## Overview

Build a React 18 + Vite + TypeScript + Tailwind CSS portfolio site with shadcn/ui, Framer Motion, React Router v6, a blog system, contact and newsletter forms, SEO, analytics, and Vercel deployment. Tasks are ordered so each step integrates cleanly into the previous one — no orphaned code.

---

## Tasks

- [x] 1. Scaffold project and install all dependencies
  - Run `npm create vite@latest personal-portfolio-website -- --template react-ts` to initialise the project
  - Install production dependencies: `react-router-dom`, `framer-motion`, `lucide-react`, `react-helmet-async`, `react-hook-form`, `@hookform/resolvers`, `zod`, `gray-matter`, `react-markdown`, `clsx`, `tailwind-merge`
  - Install dev dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `@types/node`, `vite-bundle-visualizer`
  - Initialise Tailwind CSS (`npx tailwindcss init -p`) and configure `tailwind.config.ts` with `darkMode: "class"`, content paths covering `./index.html` and `./src/**/*.{ts,tsx}`, and the shadcn/ui preset
  - Initialise shadcn/ui (`npx shadcn-ui@latest init`) and add components: `button`, `card`, `input`, `textarea`, `badge`
  - Configure `tsconfig.json` with path alias `@` → `./src`
  - Configure `vite.config.ts` with the `@` alias and `resolve.alias`
  - Update `src/index.css` with Tailwind directives (`@tailwind base/components/utilities`) and CSS custom properties for theme colours
  - _Requirements: 14.4, 18.1, 18.4_

- [x] 2. Define TypeScript types and shared utilities
  - Create `src/types/index.ts` with interfaces: `Profile`, `Skill`, `SkillCategory`, `Experience`, `Certification`, `Project`, `Service`, `Testimonial`, `BlogPost`, `BlogPostMeta`
  - Create `src/lib/utils.ts` with the shadcn/ui `cn()` helper (clsx + tailwind-merge)
  - _Requirements: 23.1–23.5_

- [x] 3. Create all content data files
  - Create `src/content/profile.json` matching the `Profile` schema (name, title, tagline, bio, photo, resumeUrl, email, social)
  - Create `src/content/skills.json` with at least two skill categories and multiple items per category
  - Create `src/content/experience.json` with at least two entries in reverse-chronological order
  - Create `src/content/certifications.json` with at least two entries; include `verificationUrl` on at least one
  - Create `src/content/projects.json` with at least three entries; include `demoUrl` and `repoUrl` on at least one
  - Create `src/content/services.json` with at least three entries using valid Lucide icon names
  - Create `src/content/testimonials.json` with at least two entries
  - Create `src/content/blog/post-slug-1.md` and `src/content/blog/post-slug-2.md` with complete front-matter (title, date, excerpt, coverImage, tags) and body content
  - Place placeholder images in `src/assets/images/` for profile photo, project thumbnails, and blog cover images
  - Place a placeholder `public/resume.pdf`
  - _Requirements: 23.1–23.6, 6.5, 7.2, 10.1, 24.1_

- [ ] 4. Implement core hooks
  - [x] 4.1 Implement `useTheme` hook
    - Create `src/hooks/useTheme.ts` that reads `localStorage` key `"portfolio-theme"`, falls back to `window.matchMedia("prefers-color-scheme: dark")`, applies/removes the `"dark"` class on `<html>`, and exposes `{ theme, toggleTheme }`
    - Create a `ThemeProvider` context in `src/hooks/useTheme.ts` (or a separate `ThemeContext.tsx`) and wrap `App.tsx` with it
    - _Requirements: 21.1–21.5_

  - [x] 4.2 Implement `useActiveSection` hook
    - Create `src/hooks/useActiveSection.ts` using `IntersectionObserver` to track which section `id` is currently in the viewport
    - Accept an array of section ids and return the currently active id
    - _Requirements: 11.5_

  - [x] 4.3 Implement `useBlogPosts` hook
    - Create `src/hooks/useBlogPosts.ts` that uses Vite's `import.meta.glob` to load all `*.md` files from `src/content/blog/`
    - Parse each file with `gray-matter` to extract front-matter and body
    - Derive `slug` from the filename, return an array of `BlogPost` objects sorted by `date` descending
    - _Requirements: 10.1–10.3, 23.4–23.5_

- [ ] 5. Implement shared components
  - [x] 5.1 Implement `SectionWrapper` component
    - Create `src/components/shared/SectionWrapper.tsx` as a Framer Motion `motion.section` wrapper
    - Apply `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.15 }}`, `transition={{ duration: 0.5 }}`
    - Use `useReducedMotion()` to disable animation when the OS reduced-motion preference is active
    - Accept `id` and `className` props; forward them to the underlying `<section>`
    - _Requirements: 12.1, 12.3_

  - [x] 5.2 Implement `ThemeToggle` component
    - Create `src/components/shared/ThemeToggle.tsx` consuming the theme context
    - Render a sun/moon icon button from Lucide React with `aria-label="Toggle theme"`
    - Switch theme within 200 ms on click (CSS transition on `<html>`)
    - _Requirements: 21.1–21.2_

  - [x] 5.3 Implement `SocialLinks` component
    - Create `src/components/shared/SocialLinks.tsx` that reads social URLs from `profile.json`
    - Render LinkedIn, GitHub, email, and optional WhatsApp links using Lucide icons
    - Add `target="_blank" rel="noopener noreferrer"` to all external links
    - Add `aria-label` to each icon-only link
    - _Requirements: 22.1–22.5_

  - [x] 5.4 Implement `StructuredData` component
    - Create `src/components/shared/StructuredData.tsx` using `react-helmet-async` to inject two `<script type="application/ld+json">` tags into `<head>`
    - First script: `Person` schema with `name`, `jobTitle`, `url`, `sameAs` (social URLs from `profile.json`)
    - Second script: `WebSite` schema with `name` and `url`
    - _Requirements: 20.1–20.4_

- [ ] 6. Implement `Navbar` and `Footer` layout components
  - [x] 6.1 Implement `Navbar`
    - Create `src/components/layout/Navbar.tsx` with links to all nine sections (Hero, About, Skills, Experience, Certifications, Projects, Services, Blog, Contact)
    - Integrate `useActiveSection` to apply an active highlight class to the current section link (`aria-current="page"`)
    - Embed `ThemeToggle` and `Resume_Download` link in the navbar
    - Implement hamburger menu for viewports < 768 px: toggle a vertical overlay/drawer with `role="dialog"` and a focus trap
    - Smooth-scroll to target section on link click (CSS `scroll-behavior: smooth` or `element.scrollIntoView`)
    - _Requirements: 9.1, 11.1–11.5, 21.1_

  - [x] 6.2 Implement `Footer`
    - Create `src/components/layout/Footer.tsx` with `SocialLinks`, copyright text, and a resume download link
    - Use semantic `<footer>` element
    - _Requirements: 9.1, 22.1, 13.4_

- [ ] 7. Implement section components — Part 1 (Hero through Skills)
  - [x] 7.1 Implement `HeroSection`
    - Create `src/components/sections/HeroSection.tsx` wrapped in `SectionWrapper id="hero"`
    - Display profile photo, name, professional title, and tagline from `profile.json`
    - Include at least one CTA button that smooth-scrolls to `#contact` or `#projects`
    - Responsive single-column layout on viewports < 768 px
    - Framer Motion hover animation on the CTA button
    - _Requirements: 1.1–1.5, 9.1_

  - [x] 7.2 Implement `AboutSection`
    - Create `src/components/sections/AboutSection.tsx` wrapped in `SectionWrapper id="about"`
    - Display biography text and profile photo/illustration from `profile.json`
    - Stack image and text vertically on viewports < 768 px
    - _Requirements: 2.1–2.3_

  - [x] 7.3 Implement `SkillsSection`
    - Create `src/components/sections/SkillsSection.tsx` wrapped in `SectionWrapper id="skills"`
    - Read `skills.json`; render each category heading with skill badges/progress indicators
    - Responsive wrapping grid on viewports < 768 px
    - _Requirements: 3.1–3.3_

- [ ] 8. Implement section components — Part 2 (Experience through Projects)
  - [x] 8.1 Implement `ExperienceSection`
    - Create `src/components/sections/ExperienceSection.tsx` wrapped in `SectionWrapper id="experience"`
    - Read `experience.json`; sort by `startDate` descending; render each entry with job title, company, date range, and description
    - Single-column layout on viewports < 768 px
    - _Requirements: 4.1–4.3_

  - [x] 8.2 Implement `CertificationsSection`
    - Create `src/components/sections/CertificationsSection.tsx` wrapped in `SectionWrapper id="certifications"`
    - Read `certifications.json`; render name, issuer, issue date; show verification link (opens in new tab) when `verificationUrl` is present
    - Responsive grid on viewports < 768 px
    - _Requirements: 5.1–5.3_

  - [x] 8.3 Implement `ProjectsSection`
    - Create `src/components/sections/ProjectsSection.tsx` wrapped in `SectionWrapper id="projects"`
    - Read `projects.json`; render title, description, technology tags (shadcn/ui `Badge`), thumbnail image with `loading="lazy"` and descriptive `alt`
    - Show demo and repo links (open in new tab) when present
    - Single-column layout on viewports < 768 px
    - _Requirements: 6.1–6.5, 14.2, 15.2_

- [ ] 9. Implement section components — Part 3 (Services through Testimonials)
  - [x] 9.1 Implement `ServicesSection`
    - Create `src/components/sections/ServicesSection.tsx` wrapped in `SectionWrapper id="services"`
    - Read `services.json`; render each service card with Lucide icon (resolved by name), title, and description
    - Responsive grid on viewports < 768 px
    - _Requirements: 7.1–7.3_

  - [x] 9.2 Implement `TestimonialsSection`
    - Create `src/components/sections/TestimonialsSection.tsx` wrapped in `SectionWrapper id="testimonials"`
    - Read `testimonials.json`; render author name, role, testimonial text, and optional photo
    - Single-column layout on viewports < 768 px
    - _Requirements: 24.1–24.5_

- [ ] 10. Implement `BlogSection` and `useBlogPosts` integration
  - [x] 10.1 Implement `BlogSection`
    - Create `src/components/sections/BlogSection.tsx` wrapped in `SectionWrapper id="blog"`
    - Consume `useBlogPosts()` to get posts sorted by date descending
    - Render each post card with title, date, cover image (`loading="lazy"`), and excerpt
    - Link each card to `/blog/:slug`
    - Single-column layout on viewports < 768 px
    - _Requirements: 10.1–10.4_

  - [x] 10.2 Implement `BlogPostPage`
    - Create `src/pages/BlogPostPage.tsx` that reads `:slug` from `useParams`, finds the matching post via `useBlogPosts()`, and renders the full Markdown body using `react-markdown`
    - Add `react-helmet-async` `<Helmet>` with post-specific `<title>` and `<meta description>`
    - Add Open Graph tags for the post (og:title, og:description, og:image)
    - Redirect to `/` if slug is not found
    - _Requirements: 10.2, 13.1–13.3_

- [ ] 11. Implement `ContactSection` with form validation and Formspree
  - [x] 11.1 Implement contact form
    - Create `src/components/sections/ContactSection.tsx` wrapped in `SectionWrapper id="contact"`
    - Build form with React Hook Form + Zod schema: fields for name (required), email (required, valid format), subject (required), message (required)
    - Display inline validation errors per field on submit attempt
    - On valid submit: POST to `import.meta.env.VITE_FORMSPREE_ENDPOINT`
    - Show success message within 5 s on 2xx response; show retry error message on network/service failure
    - Sanitize inputs (trim whitespace, escape HTML entities) before transmission
    - _Requirements: 8.1–8.7, 17.3–17.4_

  - [ ]* 11.2 Write unit tests for contact form validation
    - Test that submitting with empty fields shows per-field errors and does not POST
    - Test that an invalid email format shows the email validation error
    - Test that a valid submission triggers the POST call
    - _Requirements: 8.2–8.4_

- [ ] 12. Implement `NewsletterSection`
  - [x] 12.1 Implement newsletter form
    - Create `src/components/sections/NewsletterSection.tsx` wrapped in `SectionWrapper id="newsletter"`
    - Build form with React Hook Form + Zod: email field (required, valid format)
    - On valid submit: POST to `import.meta.env.VITE_NEWSLETTER_ENDPOINT`
    - Show confirmation message within 5 s on success; show retry error on failure
    - Render a data-use notice and privacy policy link adjacent to the form
    - _Requirements: 25.1–25.7, 17.3_

  - [ ]* 12.2 Write unit tests for newsletter form validation
    - Test that an invalid email shows the validation error and does not POST
    - Test that a valid email triggers the POST call
    - _Requirements: 25.2–25.3_

- [x] 13. Checkpoint — wire all sections into `HomePage` and configure routing
  - Create `src/pages/HomePage.tsx` that renders all sections in order: `HeroSection`, `AboutSection`, `SkillsSection`, `ExperienceSection`, `CertificationsSection`, `ProjectsSection`, `ServicesSection`, `TestimonialsSection`, `BlogSection`, `ContactSection`, `NewsletterSection`
  - Wrap `HomePage` content in `<main>` and surround with `<Navbar>` and `<Footer>`
  - Configure `src/App.tsx` with React Router v6: route `/` → `HomePage`, route `/blog/:slug` → `BlogPostPage` (lazy-loaded via `React.lazy`), wildcard `*` → redirect to `/`
  - Wrap the app in `ThemeProvider` and `HelmetProvider` in `src/main.tsx`
  - Verify the dev server renders all sections without console errors
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 11.1, 13.4, 14.4_

- [ ] 14. Implement SEO, analytics, and structured data
  - [x] 14.1 Add global SEO metadata
    - In `HomePage.tsx`, add `react-helmet-async` `<Helmet>` with `<title>`, `<meta name="description">`, and Open Graph tags (`og:title`, `og:description`, `og:image`) sourced from `profile.json`
    - Ensure `BlogPostPage.tsx` overrides these tags with post-specific values
    - _Requirements: 13.1–13.3_

  - [x] 14.2 Add `robots.txt` and `sitemap.xml`
    - Create `public/robots.txt` permitting all crawlers (`User-agent: * / Allow: /`)
    - Create `public/sitemap.xml` listing `/` and `/blog/:slug` for each blog post
    - _Requirements: 13.5–13.6_

  - [x] 14.3 Integrate `StructuredData` component
    - Add `<StructuredData />` inside the `<Helmet>` block (or directly in `HomePage.tsx`) so `Person` and `WebSite` JSON-LD scripts are injected into `<head>`
    - _Requirements: 20.1–20.4_

  - [x] 14.4 Initialise analytics
    - Implement `src/lib/analytics.ts` with `initAnalytics()` that reads `VITE_ANALYTICS_PROVIDER`; for `"plausible"` inject the Plausible script tag; for `"ga4"` load `gtag.js` and fire `config`
    - Call `initAnalytics()` in `src/main.tsx` after React DOM render so it does not block initial paint
    - _Requirements: 19.1–19.5_

- [x] 15. Configure deployment artifacts
  - Create `vercel.json` with SPA rewrite rule: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
  - Create `.env.example` documenting all `VITE_*` variables with placeholder values: `VITE_FORMSPREE_ENDPOINT`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_ANALYTICS_PROVIDER`, `VITE_PLAUSIBLE_DOMAIN`, `VITE_GA4_MEASUREMENT_ID`, `VITE_NEWSLETTER_ENDPOINT`
  - Create `CONTENT_GUIDE.md` at the project root documenting each data file's schema with examples and instructions for adding blog posts, projects, experience, certifications, skills, services, and testimonials
  - _Requirements: 18.1–18.3, 23.6_

- [x] 16. Add Content Security Policy header
  - In `vercel.json`, add a `headers` entry for `"source": "/(.*)"` that sets `Content-Security-Policy` restricting `default-src`, `script-src`, `style-src`, `img-src`, `connect-src`, and `frame-ancestors` to trusted origins (self + Formspree + analytics provider domains)
  - _Requirements: 17.2_

- [x] 17. Checkpoint — production build validation
  - Run `npm run build` and confirm zero TypeScript and Vite errors
  - Run `npm run preview` and manually verify all sections render, navigation scrolls correctly, theme toggle works, and blog post pages load
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 18.4_

- [ ] 18. Accessibility and performance audit
  - [x] 18.1 Audit and fix accessibility issues
    - Verify all `<img>` elements have descriptive `alt` text (meaningful images) or `alt=""` (decorative)
    - Verify all icon-only interactive elements have `aria-label`
    - Verify keyboard navigation reaches all interactive elements and focus rings are visible (`focus-visible:ring`)
    - Verify mobile nav drawer has `role="dialog"` and a focus trap
    - Verify color contrast ≥ 4.5:1 in both dark and light themes using browser DevTools or a contrast checker
    - _Requirements: 15.1–15.4, 21.5_

  - [x] 18.2 Audit and fix performance issues
    - Verify all below-the-fold `<img>` elements have `loading="lazy"`
    - Verify `BlogPostPage` is lazy-loaded via `React.lazy` / `Suspense`
    - Run Lighthouse on the production preview build and confirm Performance ≥ 90 and Accessibility ≥ 90 on desktop
    - _Requirements: 14.1–14.3, 15.1_

  - [x] 18.3 Verify reduced-motion support
    - Confirm `SectionWrapper` and all Framer Motion animations are disabled when `prefers-reduced-motion: reduce` is set
    - _Requirements: 12.3_

- [ ] 19. Deploy to Vercel and configure custom domain + SSL
  - Commit all files to a Git repository and push to the `main` branch on GitHub
  - Connect the GitHub repository to Vercel via the Vercel dashboard (or `vercel --prod` CLI)
  - Set all `VITE_*` environment variables in the Vercel project settings
  - Confirm Vercel auto-builds and deploys within 5 minutes of the push
  - In the Vercel dashboard, add the custom domain and verify DNS records (CNAME or A record)
  - Confirm Vercel provisions an SSL certificate and the site is served exclusively over HTTPS
  - _Requirements: 17.1, 18.1–18.3_

- [ ] 20. Final checkpoint — end-to-end verification
  - Verify the live production URL loads all sections correctly
  - Verify the contact form submits successfully via Formspree
  - Verify the newsletter form submits successfully
  - Verify blog post pages are accessible at `/blog/:slug`
  - Verify the resume PDF downloads correctly
  - Verify the theme toggle persists across page reloads
  - Verify structured data passes Google's Rich Results Test (no errors for `Person` and `WebSite` schemas)
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 8.2, 9.2, 10.2, 18.2, 20.4, 21.3_

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints (tasks 13, 17, 20) ensure incremental validation before moving to the next phase
- All `VITE_*` credentials must be set in Vercel environment variables — never committed to the repository
- The design uses no pseudocode; all implementation is in TypeScript/React as specified in the design document
