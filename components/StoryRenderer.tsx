import { parseStoryWithImages } from "@/lib/md";
import ScrollFadeImage from "./ScrollFadeImage";
import FadeInSection from "./FadeInSection";
import QuietLink from "./QuietLink";
import type { Locale } from "@/lib/i18n";

interface StoryRendererProps {
  content: string;
  lang: Locale;
}

export default function StoryRenderer({ content, lang }: StoryRendererProps) {
  const parts = parseStoryWithImages(content);

  return (
    <article id="story" className="relative bg-void pt-24">
      {parts.map((part, index) => {
        if (part.type === "ending") {
          return (
            <div key={`ending-${index}`}>
              <ScrollFadeImage
                src="/images/ending.jpg"
              />
              <div className="text-center mt-12 mb-24">
                <QuietLink href={`/${lang}/notes`} delay={500}>
                  {lang === "en"
                    ? "Author's note and clinical appendix"
                    : "Nota del autor y apéndice clínico"}
                </QuietLink>
              </div>
            </div>
          );
        }

        return (
          <FadeInSection
            key={`content-${index}`}
            className="prose-container max-w-prose mx-auto px-6 md:px-8 py-section"
          >
            <div
              className="story-prose"
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          </FadeInSection>
        );
      })}
    </article>
  );
}
