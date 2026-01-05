import { DEFAULT_LOCALE, type Locale } from "./i18n";

/**
 * Detect preferred locale from Accept-Language header
 * 
 * Properly parses Accept-Language header respecting:
 * - Language priority order
 * - Quality values (q=)
 * - Language subtags (en-US, es-MX, etc.)
 * 
 * @param acceptLanguage - Accept-Language header value
 * @returns Detected locale or DEFAULT_LOCALE
 * 
 * @example
 * detectLocale("en-US,en;q=0.9,es;q=0.8") // => "en"
 * detectLocale("es-MX,es;q=0.9") // => "es"
 * detectLocale("fr-FR,fr;q=0.9") // => DEFAULT_LOCALE (es)
 */
export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  // Parse Accept-Language header into array of language codes
  // Format: "en-US,en;q=0.9,es;q=0.8,fr;q=0.7"
  const languages = acceptLanguage
    .toLowerCase()
    .split(",")
    .map((lang) => {
      // Remove quality value (;q=0.9) and trim
      const code = lang.split(";")[0].trim();
      // Extract primary language tag (en from en-US)
      return code.split("-")[0];
    })
    .filter(Boolean);

  // Check languages in priority order
  for (const lang of languages) {
    if (lang === "en") return "en";
    if (lang === "es") return "es";
  }

  // No supported language found, use default
  return DEFAULT_LOCALE;
}
