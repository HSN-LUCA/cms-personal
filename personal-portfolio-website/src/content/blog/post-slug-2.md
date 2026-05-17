---
title: "Accessibility Is Not a Feature — It's a Baseline"
date: "2023-11-08"
excerpt: "After failing an accessibility audit on a product I was proud of, I rethought my entire approach to building UIs. Here's what changed and why it made me a better engineer."
coverImage: "/images/blog-2.jpg"
tags: ["Accessibility", "React", "WCAG", "Inclusive Design"]
---

## A Humbling Audit

A few years into my career, I was asked to sit in on an accessibility audit for a product I'd spent six months building. I was proud of it — the design was clean, the animations were smooth, and the Lighthouse performance score was in the 90s. Then the auditor opened a screen reader and started navigating.

Within two minutes, she had found a modal that trapped keyboard focus, a form with no error announcements, and a set of icon buttons with no accessible labels. The product was effectively unusable for a significant portion of potential users. It was a turning point for me.

## What I Got Wrong

The core mistake was treating accessibility as a polish step — something to address after the "real" work was done. This is backwards. Accessibility decisions are architectural. If you build a custom dropdown component without thinking about keyboard navigation and ARIA roles from the start, retrofitting it later is painful and error-prone. The same is true for focus management, color contrast, and semantic HTML structure.

I also underestimated how much accessibility overlaps with general code quality. Semantic HTML is easier to style and maintain. Proper heading hierarchy makes pages easier to navigate for everyone, not just screen reader users. Forms with clear labels and error messages reduce support tickets. The "extra work" of accessibility often pays dividends in ways that have nothing to do with disability.

## Building Accessible UIs in Practice

The practical changes I made were not dramatic. I started using semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`) instead of `<div>` soup. I added `aria-label` to every icon-only interactive element. I tested keyboard navigation on every component I shipped. I used a browser extension to check color contrast ratios before calling a design done.

For React specifically, I leaned on libraries like Radix UI and shadcn/ui that bake accessibility in by default. I added `useReducedMotion()` from Framer Motion to respect users' OS-level animation preferences. None of these changes slowed me down significantly — they just became part of how I work. Accessibility is not a feature you add. It's a standard you hold yourself to from the first line of code.
