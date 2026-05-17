import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().min(1, "Email is required.").email("Enter a valid email."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(1, "Message is required."),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

function escapeHtml(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function sanitize(v: string) { return escapeHtml(v.trim()); }

// Inline underline input used inside the sentence
function InlineInput({
  id,
  placeholder,
  type = "text",
  hasError,
  wide,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean; wide?: boolean }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={cn(
        "form-inline-input",
        wide ? "min-w-[200px] w-48 sm:w-64" : "min-w-[120px] w-32 sm:w-44",
        hasError && "error"
      )}
      {...rest}
    />
  );
}

export default function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormValues) => {
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
    if (!endpoint) { setSubmitStatus("error"); return; }
    setSubmitStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: sanitize(data.name),
          email: sanitize(data.email),
          subject: sanitize(data.subject),
          message: sanitize(data.message),
        }),
      });
      setSubmitStatus(res.ok ? "success" : "error");
      if (res.ok) reset();
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          04 — Contact
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-foreground mb-16">
          Drop us a note
        </h2>

        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-start gap-4"
            >
              <CheckCircle className="h-10 w-10 text-foreground" />
              <p className="font-heading text-2xl font-semibold text-foreground">
                Message sent!
              </p>
              <p className="text-muted-foreground">
                I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className="mt-2 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Error banner */}
              <AnimatePresence>
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="mb-8 flex items-center gap-2 text-sm text-destructive"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Something went wrong. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Conversational sentence */}
              <div className="font-heading text-2xl sm:text-3xl leading-relaxed text-foreground space-y-6">

                {/* Line 1: My name is ___ */}
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <span>My name is</span>
                  <span className="flex flex-col">
                    <InlineInput
                      id="contact-name"
                      placeholder="your name"
                      hasError={!!errors.name}
                      aria-required="true"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <span id="err-name" role="alert" className="mt-1 text-xs font-sans font-normal text-destructive">
                        {errors.name.message}
                      </span>
                    )}
                  </span>
                  <span>,</span>
                </p>

                {/* Line 2: my email address is ___ */}
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <span>my email address is</span>
                  <span className="flex flex-col">
                    <InlineInput
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      wide
                      hasError={!!errors.email}
                      aria-required="true"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      {...register("email")}
                    />
                    {errors.email && (
                      <span id="err-email" role="alert" className="mt-1 text-xs font-sans font-normal text-destructive">
                        {errors.email.message}
                      </span>
                    )}
                  </span>
                  <span>,</span>
                </p>

                {/* Line 3: I am contacting you regarding ___ */}
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <span>I am contacting you regarding</span>
                  <span className="flex flex-col">
                    <InlineInput
                      id="contact-subject"
                      placeholder="project inquiry"
                      wide
                      hasError={!!errors.subject}
                      aria-required="true"
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "err-subject" : undefined}
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <span id="err-subject" role="alert" className="mt-1 text-xs font-sans font-normal text-destructive">
                        {errors.subject.message}
                      </span>
                    )}
                  </span>
                  <span>.</span>
                </p>

                {/* Line 4: I want to tell you that: */}
                <div className="flex flex-col gap-2">
                  <p>I want to tell you that:</p>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="write your message here…"
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    className={cn(
                      "w-full resize-none bg-transparent border-b-2 border-border font-sans text-base font-normal text-foreground placeholder:text-muted-foreground placeholder:italic outline-none transition-colors focus:border-foreground pt-2",
                      errors.message && "border-destructive"
                    )}
                    {...register("message")}
                  />
                  {errors.message && (
                    <span id="err-message" role="alert" className="text-xs font-sans font-normal text-destructive">
                      {errors.message.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="mt-10">
                <motion.button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {submitStatus === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    "Send a message →"
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
