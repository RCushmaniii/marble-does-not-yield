import en from "@/i18n/en.json";
import es from "@/i18n/es.json";
import notesEn from "@/i18n/notes.en.json";
import notesEs from "@/i18n/notes.es.json";

export type Locale = "en" | "es";

const translations = { en, es };
const notesTranslations = { en: notesEn, es: notesEs };

/**
 * Get translations for a specific locale
 */
export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

/**
 * Get notes translations for a specific locale
 */
export function getNotesTranslations(locale: Locale) {
  return notesTranslations[locale] || notesTranslations.en;
}

/**
 * Supported locales
 */
export const SUPPORTED_LOCALES: Locale[] = ["en", "es"];

/**
 * Default locale
 */
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Check if a locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}
