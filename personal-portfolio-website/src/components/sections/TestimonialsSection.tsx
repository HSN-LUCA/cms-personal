import { Quote } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import type { Testimonial } from "@/types/index";
import testimonialsData from "@/content/testimonials.json";

const testimonials = testimonialsData as Testimonial[];

export default function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Testimonials
        </h2>

        {/* Single-column on mobile, 1-column max-width layout */}
        <div className="flex flex-col gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm"
            >
              {/* Quote icon */}
              <Quote
                size={28}
                className="text-primary/40 mb-4"
                aria-hidden="true"
              />

              {/* Testimonial text */}
              <blockquote className="text-base sm:text-lg text-foreground leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author info */}
              <footer className="flex items-center gap-4">
                {testimonial.photo && (
                  <img
                    src={testimonial.photo}
                    alt={`Photo of ${testimonial.author}`}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-border"
                  />
                )}
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
