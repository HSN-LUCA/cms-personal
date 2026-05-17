import { Helmet } from "react-helmet-async";
import profile from "../../content/profile.json";

/**
 * StructuredData injects two JSON-LD <script> tags into <head> via react-helmet-async:
 *  1. Person schema — name, jobTitle, url, sameAs (social URLs)
 *  2. WebSite schema — name, url
 *
 * The site URL is read from VITE_SITE_URL, falling back to a placeholder.
 */
export function StructuredData() {
  const siteUrl =
    import.meta.env.VITE_SITE_URL ?? "https://yourportfolio.com";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: siteUrl,
    sameAs: [profile.social.linkedin, profile.social.github],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.name,
    url: siteUrl,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
}
