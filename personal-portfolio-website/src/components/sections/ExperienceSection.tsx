import SectionWrapper from "@/components/shared/SectionWrapper";
import type { Experience } from "@/types/index";
import experienceData from "@/content/experience.json";

const experience = (experienceData as Experience[]).slice().sort(
  (a, b) => b.startDate.localeCompare(a.startDate)
);

/**
 * Formats a "YYYY-MM" date string to "Mon YYYY" (e.g. "Mar 2022").
 */
function formatDate(yyyyMm: string): string {
  const [year, month] = yyyyMm.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Returns a formatted date range string, e.g. "Mar 2022 – Present".
 */
function formatDateRange(startDate: string, endDate: string | null): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} – ${end}`;
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Experience
        </h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-border"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {experience.map((entry, index) => (
              <li key={index} className="relative pl-12">
                {/* Timeline dot */}
                <div
                  className="absolute left-[11px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background"
                  aria-hidden="true"
                />

                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground">
                    {entry.title}
                  </h3>
                  <p className="text-sm font-medium text-primary mt-0.5">
                    {entry.company}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    {formatDateRange(entry.startDate, entry.endDate)}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionWrapper>
  );
}
