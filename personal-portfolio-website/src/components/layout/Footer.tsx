import { Download } from "lucide-react";
import { SocialLinks } from "../shared/SocialLinks";
import profile from "../../content/profile.json";

/**
 * Footer renders social links, a resume download link, and copyright text.
 * Uses a semantic <footer> element.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        {/* Social links */}
        <SocialLinks />

        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center">
          &copy; {currentYear} {profile.name}. All rights reserved.
        </p>

        {/* Resume download */}
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Resume
        </a>
      </div>
    </footer>
  );
}
