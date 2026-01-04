/**
 * Centralized motion settings for narrative pacing
 */

export const motion = {
  // Hero title sequence
  hero: {
    image: {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 1.4,
        ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
   title: {
      transition: {
        duration: 0.7,
        delay: 2.5, // was 1.5
        ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },

    byline: {
      transition: {
        duration: 0.6,
        delay: 3.0, // was 2.0
        ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },

    description: {
      transition: {
        duration: 0.6,
        delay: 3.3, // was 2.4
        ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },

    scrollIndicator: {
      transition: {
        duration: 0.5,
        delay: 3.5, // was 3.0
        ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },

    intro: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  },

  // Scroll-triggered images
  scrollFade: {
    duration: 1200, // ms
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },

  // Reduced motion fallback
  reduced: {
    duration: 0.01,
    delay: 0,
  },
} as const;

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
