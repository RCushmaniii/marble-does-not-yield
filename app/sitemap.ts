import { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

const SITE_URL = "https://marble-does-not-yield.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add an entry for each supported locale
  SUPPORTED_LOCALES.forEach((locale) => {
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          es: `${SITE_URL}/es`,
        },
      },
    });
  });

  return sitemapEntries;
}
