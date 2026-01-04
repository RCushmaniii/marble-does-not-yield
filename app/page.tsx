import Hero from "@/components/Hero";
import StoryRenderer from "@/components/StoryRenderer";
import { getStoryContent } from "@/lib/md";

export default async function Page() {
  const story = await getStoryContent();

  return (
    <main className="relative">
      <Hero />
      <StoryRenderer content={story} />
    </main>
  );
}
