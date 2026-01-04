import type { Metadata, Viewport } from "next";
import { getTranslations, isValidLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const SITE_URL = "https://marble-does-not-yield.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const t = getTranslations(lang as Locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.site.title,
    description: t.site.description,
    openGraph: {
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      type: "article",
      locale: lang === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t.site.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      images: ["/images/og-image.jpg"],
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        en: `${SITE_URL}/en`,
        es: `${SITE_URL}/es`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  return (
    <>
      <div lang={lang} className="relative">
        <LanguageSwitcher currentLang={lang as Locale} />
        {children}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
