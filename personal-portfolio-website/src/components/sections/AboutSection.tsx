import SectionWrapper from "@/components/shared/SectionWrapper";
import profile from "@/content/profile.json";

export default function AboutSection() {
  // Split bio on double newlines to render separate paragraphs
  const paragraphs = profile.bio.split(/\n\n+/).filter(Boolean);

  return (
    <SectionWrapper
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Profile photo */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-lg ring-2 ring-border">
              <img
                src={profile.photo}
                alt={`Photo of ${profile.name}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio text */}
          <article className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {profile.title}
            </h3>
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed text-base sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Resume download link */}
            <div className="mt-6">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                Download Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </SectionWrapper>
  );
}
