import Hero from "@/components/Hero";
import StoryRenderer from "@/components/StoryRenderer";
import { getStoryContent } from "@/lib/md";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  // Validate locale
  if (!isValidLocale(lang)) {
    notFound();
  }

  const story = await getStoryContent(lang as Locale);

  return (
    <main className="relative">
      <Hero lang={lang as Locale} />
      <StoryRenderer content={story} lang={lang as Locale} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
