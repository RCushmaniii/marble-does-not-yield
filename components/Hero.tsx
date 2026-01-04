"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "@/lib/motion";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const imageStyle = mounted
    ? reducedMotion
      ? { opacity: 1, transform: "translateY(0)" }
      : {
          opacity: 1,
          transform: "translateY(0)",
          transition: `opacity ${motion.hero.image.transition.duration}s ${motion.hero.image.transition.ease}, transform ${motion.hero.image.transition.duration}s ${motion.hero.image.transition.ease}`,
        }
    : {
        opacity: 0,
        transform: "translateY(-100%)",
      };

  const titleStyle = mounted
    ? reducedMotion
      ? { opacity: 1, transform: "translateY(0)" }
      : {
          opacity: 1,
          transform: "translateY(0)",
          transition: `opacity ${motion.hero.title.transition.duration}s ${motion.hero.title.transition.ease} ${motion.hero.title.transition.delay}s, transform ${motion.hero.title.transition.duration}s ${motion.hero.title.transition.ease} ${motion.hero.title.transition.delay}s`,
        }
    : {
        opacity: 0,
        transform: "translateY(20px)",
      };

  const bylineStyle = mounted
    ? reducedMotion
      ? { opacity: 1, transform: "translateY(0)" }
      : {
          opacity: 1,
          transform: "translateY(0)",
          transition: `opacity ${motion.hero.byline.transition.duration}s ${motion.hero.byline.transition.ease} ${motion.hero.byline.transition.delay}s, transform ${motion.hero.byline.transition.duration}s ${motion.hero.byline.transition.ease} ${motion.hero.byline.transition.delay}s`,
        }
    : {
        opacity: 0,
        transform: "translateY(15px)",
      };

  const descriptionStyle = mounted
    ? reducedMotion
      ? { opacity: 1, transform: "translateY(0)" }
      : {
          opacity: 1,
          transform: "translateY(0)",
          transition: `opacity ${motion.hero.description.transition.duration}s ${motion.hero.description.transition.ease} ${motion.hero.description.transition.delay}s, transform ${motion.hero.description.transition.duration}s ${motion.hero.description.transition.ease} ${motion.hero.description.transition.delay}s`,
        }
    : {
        opacity: 0,
        transform: "translateY(12px)",
      };

  const scrollIndicatorStyle = mounted
    ? reducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          transition: `opacity ${motion.hero.scrollIndicator.transition.duration}s ${motion.hero.scrollIndicator.transition.ease} ${motion.hero.scrollIndicator.transition.delay}s`,
        }
    : {
        opacity: 0,
      };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Desktop Hero Image */}
      <div 
        className="hidden md:block absolute inset-0 z-0"
        style={imageStyle}
      >
        <Image
          src="/images/main-header-desktop.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Mobile Hero Image */}
      <div 
        className="md:hidden absolute inset-0 z-0"
        style={imageStyle}
      >
        <Image
          src="/images/main-header-mobile.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-void z-10" />

      {/* Title block */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center space-y-4">
          <h1
            style={titleStyle}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] tracking-tight"
          >
            The Marble Does Not Yield
          </h1>
          <p
            style={bylineStyle}
            className="font-display text-base md:text-lg text-parchment/70 tracking-wide"
          >
            by Robert Cushman
          </p>
          <p
            style={descriptionStyle}
            className="font-body text-lg md:text-xl text-parchment/90 max-w-2xl mx-auto pt-2"
          >
            A story of pain, vulnerability, and the refusal to yield.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        style={scrollIndicatorStyle}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <svg
            className="w-6 h-6 text-parchment/60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-10" />
    </section>
  );
}
