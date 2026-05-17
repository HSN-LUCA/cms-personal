import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Framer Motion scroll-reveal wrapper for page sections.
 * Fades and slides in when the section enters the viewport.
 * Respects the OS reduced-motion preference via `useReducedMotion()`.
 */
export default function SectionWrapper({
  id,
  className,
  children,
}: SectionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
}
