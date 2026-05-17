import SectionWrapper from "@/components/shared/SectionWrapper";
import type { Certification } from "@/types/index";
import certificationsData from "@/content/certifications.json";

const certifications = certificationsData as Certification[];

/**
 * Formats a "YYYY-MM" date string to "Mon YYYY" (e.g. "May 2023").
 */
function formatDate(yyyyMm: string): string {
  const [year, month] = yyyyMm.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function CertificationsSection() {
  return (
    <SectionWrapper
      id="certifications"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Certifications
        </h2>

        {/* Responsive grid: 1 col on mobile, 2 on md, 3 on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-2"
            >
              <h3 className="text-base font-semibold text-foreground leading-snug">
                {cert.name}
              </h3>
              <p className="text-sm text-primary font-medium">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(cert.issueDate)}
              </p>

              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  aria-label={`Verify ${cert.name} certification`}
                >
                  Verify ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
