"use client";

import Image from "next/image";

export default function HeroImage() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Desktop Hero */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/images/main-header-desktop.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Mobile Hero */}
      <div className="md:hidden absolute inset-0">
        <Image
          src="/images/main-header-mobile.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Title overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="font-title font-bold text-5xl md:text-7xl lg:text-8xl text-center text-white leading-tight tracking-tight drop-shadow-2xl">
          The Marble Does Not Yield
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
