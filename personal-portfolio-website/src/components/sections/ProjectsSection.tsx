import SectionWrapper from "@/components/shared/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/index";
import projectsData from "@/content/projects.json";

const projects = projectsData as Project[];

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Projects
        </h2>

        {/* Single-column on mobile, 2-column grid on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} project screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Technology tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                {(project.demoUrl || project.repoUrl) && (
                  <div className="flex items-center gap-4 pt-1">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        aria-label={`View source code for ${project.title}`}
                      >
                        Source Code ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
