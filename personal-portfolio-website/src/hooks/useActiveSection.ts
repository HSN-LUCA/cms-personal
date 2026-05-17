import { useEffect, useRef, useState } from "react";

/**
 * Tracks which section is currently visible in the viewport using
 * `IntersectionObserver`. Returns the `id` of the active section.
 *
 * The `rootMargin` of `"-40% 0px -40% 0px"` means a section is considered
 * "active" only when it occupies the middle 20% band of the viewport, which
 * produces a natural highlight transition as the user scrolls.
 *
 * @param sectionIds - Ordered array of section element ids to observe.
 * @returns The id of the currently active section, or the first id when none
 *          is intersecting (e.g. at the very top of the page).
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] ?? ""
  );

  // Keep a stable ref to the ids array so the effect doesn't re-run on every
  // render if the caller passes an inline array literal.
  const sectionIdsRef = useRef(sectionIds);
  useEffect(() => {
    sectionIdsRef.current = sectionIds;
  }, [sectionIds]);

  useEffect(() => {
    if (sectionIdsRef.current.length === 0) return;

    // Map from element → id for O(1) lookup inside the callback.
    const elementToId = new Map<Element, string>();

    const observer = new IntersectionObserver(
      (entries) => {
        // Collect all currently intersecting section ids.
        const intersecting: string[] = [];

        entries.forEach((entry) => {
          const id = elementToId.get(entry.target);
          if (id && entry.isIntersecting) {
            intersecting.push(id);
          }
        });

        if (intersecting.length > 0) {
          // When multiple sections intersect simultaneously (e.g. on a very
          // tall viewport), prefer the one that appears first in the ordered
          // sectionIds array.
          const ordered = sectionIdsRef.current.filter((id) =>
            intersecting.includes(id)
          );
          if (ordered.length > 0) {
            setActiveSection(ordered[0]);
          }
        }
        // If nothing is intersecting we leave the previous active section
        // unchanged — this avoids flickering during the scroll gap between
        // two sections.
      },
      {
        // Only trigger when the section crosses the middle 20% band of the
        // viewport (top 40% and bottom 40% are excluded).
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    // Observe each section element.
    sectionIdsRef.current.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        elementToId.set(el, id);
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []); // Run once on mount; sectionIds changes are handled via the ref.

  return activeSection;
}
