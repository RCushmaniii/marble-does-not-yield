"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface QuietLinkProps {
  href: string;
  children: React.ReactNode;
  delay?: number;
}

export default function QuietLink({ href, children, delay = 500 }: QuietLinkProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Link
      href={href}
      className="inline-block text-sm text-ash hover:text-parchment transition-colors no-underline hover:underline"
      style={{
        opacity: isVisible ? 0.6 : 0,
        transition: "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {children}
    </Link>
  );
}
