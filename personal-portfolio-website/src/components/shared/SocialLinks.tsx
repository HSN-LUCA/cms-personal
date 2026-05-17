import { ExternalLink, Code2, Mail, MessageCircle } from "lucide-react";
import profile from "../../content/profile.json";
import { cn } from "../../lib/utils";

interface SocialLinksProps {
  /** Optional class name for styling flexibility */
  className?: string;
}

/**
 * SocialLinks renders icon-only links for LinkedIn, GitHub, email,
 * and optionally WhatsApp (when social.whatsapp is present in profile.json).
 * All external links open in a new tab with rel="noopener noreferrer".
 */
export function SocialLinks({ className }: SocialLinksProps) {
  const { social, email } = profile;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* LinkedIn */}
      <a
        href={social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="rounded-md p-2 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ExternalLink className="h-5 w-5" aria-hidden="true" />
      </a>

      {/* GitHub */}
      <a
        href={social.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="rounded-md p-2 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Code2 className="h-5 w-5" aria-hidden="true" />
      </a>

      {/* Email */}
      <a
        href={`mailto:${email}`}
        aria-label="Send email"
        className="rounded-md p-2 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Mail className="h-5 w-5" aria-hidden="true" />
      </a>

      {/* WhatsApp — only rendered when social.whatsapp is present */}
      {social.whatsapp && (
        <a
          href={`https://wa.me/${social.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp contact"
          className="rounded-md p-2 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
