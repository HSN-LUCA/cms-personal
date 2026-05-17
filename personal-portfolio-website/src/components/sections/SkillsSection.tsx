import SectionWrapper from "@/components/shared/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory, SkillLevel } from "@/types/index";
import skillsData from "@/content/skills.json";

const skills = skillsData as SkillCategory[];

/** Map skill level to a Badge variant and a human-readable label */
function levelConfig(level: SkillLevel): {
  variant: "default" | "secondary" | "outline" | "destructive";
  label: string;
} {
  switch (level) {
    case "expert":
      return { variant: "default", label: "Expert" };
    case "advanced":
      return { variant: "secondary", label: "Advanced" };
    case "intermediate":
      return { variant: "outline", label: "Intermediate" };
    case "beginner":
    default:
      return { variant: "outline", label: "Beginner" };
  }
}

export default function SkillsSection() {
  return (
    <SectionWrapper
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category) => (
            <div
              key={category.category}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {category.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => {
                  const { variant, label } = levelConfig(skill.level);
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-1.5"
                      title={`${skill.name} — ${label}`}
                    >
                      <Badge variant={variant} className="text-xs">
                        {skill.name}
                      </Badge>
                    </div>
                  );
                })}
              </div>

              {/* Level legend at the bottom of each card */}
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2 text-xs text-muted-foreground">
                {(
                  [
                    "expert",
                    "advanced",
                    "intermediate",
                    "beginner",
                  ] as SkillLevel[]
                )
                  .filter((lvl) =>
                    category.items.some((item) => item.level === lvl)
                  )
                  .map((lvl) => {
                    const { variant, label } = levelConfig(lvl);
                    return (
                      <span key={lvl} className="flex items-center gap-1">
                        <Badge variant={variant} className="text-xs py-0">
                          {label}
                        </Badge>
                      </span>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
