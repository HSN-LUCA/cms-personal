import type { ElementType } from "react";
import * as LucideIcons from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import type { Service } from "@/types/index";
import servicesData from "@/content/services.json";

const services = servicesData as Service[];

export default function ServicesSection() {
  return (
    <SectionWrapper id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Services
        </h2>

        {/* 1 column on mobile, 2 on md, 3 on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = LucideIcons[
              service.icon as keyof typeof LucideIcons
            ] as ElementType | undefined;

            return (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
                  {IconComponent ? (
                    <IconComponent size={24} aria-hidden="true" />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {service.icon}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
