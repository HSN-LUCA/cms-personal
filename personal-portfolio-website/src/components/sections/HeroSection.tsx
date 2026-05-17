import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import profile from "@/content/profile.json";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SectionWrapper
      id="hero"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            {profile.name}
          </h1>
          <p className="text-xl sm:text-2xl text-primary font-medium mb-4">
            {profile.title}
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
            {profile.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            >
              <Button
                size="lg"
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto"
              >
                Get in Touch
              </Button>
            </motion.div>

            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("projects")}
                className="w-full sm:w-auto"
              >
                View Projects
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Profile photo */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-2xl">
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}, ${profile.title}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/30 -z-10" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
