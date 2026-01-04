"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInSection({ children, className = "" }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is initially below viewport
    const rect = element.getBoundingClientRect();
    const isBelowViewport = rect.top > window.innerHeight;
    
    if (isBelowViewport && !reducedMotion) {
      setShouldAnimate(true);
    } else {
      setHasAnimated(true);
    }

    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && shouldAnimate && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (shouldAnimate) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [reducedMotion, shouldAnimate, hasAnimated]);

  const style = shouldAnimate && !reducedMotion
    ? {
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }
    : {};

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
