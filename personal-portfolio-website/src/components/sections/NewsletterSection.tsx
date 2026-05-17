import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Zod schema — Requirement 25.3: validate email format
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address (e.g. you@example.com)."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function NewsletterSection() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  // Requirement 25.2: POST to VITE_NEWSLETTER_ENDPOINT on valid submit
  // Requirement 25.6: credentials stored in env vars, never hardcoded
  const onSubmit = async (data: NewsletterFormValues) => {
    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;

    if (!endpoint) {
      console.error("VITE_NEWSLETTER_ENDPOINT is not configured.");
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("loading");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        // Requirement 25.4: show confirmation within 5 s on success
        setSubmitStatus("success");
        reset();
      } else {
        // Requirement 25.5: show retry error on failure
        setSubmitStatus("error");
      }
    } catch {
      // Requirement 25.5: network error → show retry message
      setSubmitStatus("error");
    }
  };

  const handleRetry = () => {
    setSubmitStatus("idle");
  };

  return (
    <SectionWrapper id="newsletter">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Subscribe to get notified when new articles are published. No spam,
            unsubscribe at any time.
          </p>
        </div>

        {/* Form card */}
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Success state — Requirement 25.4 */}
          {submitStatus === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col items-center gap-3 text-center"
            >
              <CheckCircle
                className="h-12 w-12 text-green-500"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold text-foreground">
                You&apos;re subscribed!
              </h3>
              <p className="text-muted-foreground">
                Thanks for subscribing. You&apos;ll hear from us when new
                articles drop.
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => setSubmitStatus("idle")}
              >
                Subscribe another email
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Newsletter subscription form"
            >
              {/* Error banner — Requirement 25.5 */}
              {submitStatus === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Something went wrong. Please try again in a moment.
                  </span>
                </div>
              )}

              {/* Email field — Requirement 25.1 */}
              <div className="space-y-1.5">
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email address
                  <span className="ml-1 text-destructive" aria-hidden="true">
                    *
                  </span>
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={
                    errors.email ? "newsletter-email-error" : undefined
                  }
                  className={cn(
                    errors.email &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  {...register("email")}
                />
                {/* Inline validation error — Requirement 25.3 */}
                {errors.email && (
                  <p
                    id="newsletter-email-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={submitStatus === "loading"}
                className="mt-4 w-full"
              >
                {submitStatus === "loading" ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Subscribing…
                  </>
                ) : submitStatus === "error" ? (
                  "Try Again"
                ) : (
                  "Subscribe"
                )}
              </Button>

              {/* Retry link when in error state */}
              {submitStatus === "error" && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="mt-2 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Reset form
                </button>
              )}
            </form>
          )}

          {/* Data-use notice + privacy policy link — Requirement 25.7 */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By subscribing you agree to receive occasional email updates about
            new blog posts. Your email address will never be shared with third
            parties. Read our{" "}
            <a
              href="/privacy-policy"
              className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              privacy policy
            </a>{" "}
            to learn how your data is used.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
