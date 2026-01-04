"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion as motionSettings } from "@/lib/motion";

interface ScrollFadeImageProps {
  src: string;
  alt?: string;
}

export default function ScrollFadeImage({ src, alt = "" }: ScrollFadeImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setOpacity(1);
      return;
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setOpacity(1);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;
            setOpacity(Math.min(1, ratio * 1.2));
          } else {
            setOpacity(0);
          }
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: "0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const transitionStyle = reducedMotion
    ? {}
    : {
        transition: `opacity ${motionSettings.scrollFade.duration}ms ${motionSettings.scrollFade.easing}`,
      };

  return (
    <div
      ref={ref}
      className="mx-auto -mt-4 mb-20 max-w-[var(--reading-width)] px-4"
      style={{
        opacity,
        ...transitionStyle,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className="w-full h-auto rounded-sm"
        quality={90}
        sizes="(max-width: 768px) 100vw, 72ch"
        priority
      />
    </div>
  );
}
