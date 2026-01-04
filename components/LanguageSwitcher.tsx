import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLang: Locale;
};

/**
 * Language switcher component
 * Simple, quiet, always visible
 */
export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  return (
    <nav
      aria-label="Language selection"
      className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 text-sm font-medium"
    >
      <Link
        href="/en"
        aria-label="English version"
        aria-current={currentLang === "en" ? "page" : undefined}
        className={`
          px-3 py-1.5 rounded transition-colors
          ${
            currentLang === "en"
              ? "bg-white text-stone-900 font-semibold shadow-sm"
              : "text-stone-400 hover:text-stone-200"
          }
        `}
      >
        EN
      </Link>
      <span className="text-stone-400" aria-hidden="true">
        /
      </span>
      <Link
        href="/es"
        aria-label="Versión en español"
        aria-current={currentLang === "es" ? "page" : undefined}
        className={`
          px-3 py-1.5 rounded transition-colors
          ${
            currentLang === "es"
              ? "bg-white text-stone-900 font-semibold shadow-sm"
              : "text-stone-400 hover:text-stone-200"
          }
        `}
      >
        ES
      </Link>
    </nav>
  );
}
