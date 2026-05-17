/**
 * Analytics initialisation.
 *
 * Reads VITE_ANALYTICS_PROVIDER and dynamically injects the appropriate
 * analytics script without blocking the initial render.
 *
 * Supported providers:
 *   "plausible" — cookieless, GDPR-friendly (default recommendation)
 *   "ga4"       — Google Analytics 4
 *   (anything else) — no-op
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

function injectScript(src: string, attributes: Record<string, string> = {}): void {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  for (const [key, value] of Object.entries(attributes)) {
    script.setAttribute(key, value);
  }
  document.head.appendChild(script);
}

export function initAnalytics(): void {
  const provider = import.meta.env.VITE_ANALYTICS_PROVIDER as string | undefined;

  if (provider === "plausible") {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
    if (!domain) {
      console.warn("[analytics] VITE_PLAUSIBLE_DOMAIN is not set; skipping Plausible init.");
      return;
    }
    injectScript("https://plausible.io/js/script.js", {
      defer: "",
      "data-domain": domain,
    });
  } else if (provider === "ga4") {
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
    if (!measurementId) {
      console.warn("[analytics] VITE_GA4_MEASUREMENT_ID is not set; skipping GA4 init.");
      return;
    }
    // Load the gtag.js library
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);

    // Initialise the data layer and fire the config event
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function (...args) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  }
  // For any other value (including undefined), do nothing.
}
