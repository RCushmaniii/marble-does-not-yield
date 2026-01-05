import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

const DOCS_DIR = path.join(process.cwd(), "docs");

const DOCS_NAV = [
  { title: "Documentation Index", slug: "INDEX" },
  { title: "Design System", slug: "DESIGN_SYSTEM" },
  { title: "Lessons Learned", slug: "LESSONS_LEARNED" },
  { title: "Portfolio Overview", slug: "PORTFOLIO" },
  { title: "Release Notes v2.1.0", slug: "RELEASE_NOTES_v2.1.0" },
  { title: "Release Notes v1.1.0", slug: "RELEASE_NOTES_v1.1.0" },
  { title: "AI Engineering Rules", slug: "AI_ENGINEERING_RULES" },
  { title: "Pre-Deployment Checklist", slug: "PRE_DEPLOYMENT_CHECKLIST" },
  { title: "Assets Needed", slug: "ASSETS_NEEDED" },
  { title: "Working with Humans", slug: "SKILL-WORKING-WITH-HUMANS" },
  { title: "Claude Notes", slug: "CLAUDE" },
];

async function getDocContent(slug: string) {
  try {
    const filePath = path.join(DOCS_DIR, `${slug}.md`);
    let fileContent = await fs.readFile(filePath, "utf8");
    
    // Fix relative markdown links to point to /docs/ routes
    // Convert [text](FILENAME.md) to [text](/docs/FILENAME)
    fileContent = fileContent.replace(
      /\[([^\]]+)\]\(([A-Z_-]+)\.md\)/g,
      "[$1](/docs/$2)"
    );
    
    // Convert [text](./docs/FILENAME.md) to [text](/docs/FILENAME)
    fileContent = fileContent.replace(
      /\[([^\]]+)\]\(\.\/docs\/([A-Z_-]+)\.md\)/g,
      "[$1](/docs/$2)"
    );
    
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(fileContent);
    
    return processedContent.toString();
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  return DOCS_NAV.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getDocContent(slug);

  if (!content) {
    notFound();
  }

  const currentDoc = DOCS_NAV.find((doc) => doc.slug === slug);

  return (
    <div className="min-h-screen bg-void text-parchment">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 min-h-screen bg-black/30 border-r border-parchment/10 fixed left-0 top-0 overflow-y-auto">
          <div className="p-6">
            <Link
              href="/"
              className="text-parchment/60 hover:text-parchment text-sm mb-6 block"
            >
              ← Back to Site
            </Link>
            <h2 className="text-lg font-display font-semibold mb-4 text-parchment">
              Documentation
            </h2>
            <nav className="space-y-1">
              {DOCS_NAV.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className={`block px-3 py-2 rounded text-sm transition-colors ${
                    doc.slug === slug
                      ? "bg-parchment/10 text-parchment font-medium"
                      : "text-parchment/60 hover:text-parchment hover:bg-parchment/5"
                  }`}
                >
                  {doc.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-parchment mb-2">
                {currentDoc?.title}
              </h1>
              <div className="h-px bg-parchment/20 w-full" />
            </div>
            
            <article
              className="prose prose-invert prose-parchment max-w-none
                prose-headings:font-display prose-headings:text-parchment prose-headings:leading-tight prose-headings:mb-4
                prose-p:text-parchment/90 prose-p:leading-loose prose-p:mb-6
                prose-a:text-parchment prose-a:underline prose-a:decoration-parchment/30
                hover:prose-a:decoration-parchment
                prose-strong:text-parchment prose-strong:font-semibold
                prose-code:text-parchment/90 prose-code:bg-black/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-black/50 prose-pre:border prose-pre:border-parchment/10 prose-pre:my-6
                prose-ul:text-parchment/90 prose-ul:leading-loose prose-ul:mb-6
                prose-ol:text-parchment/90 prose-ol:leading-loose prose-ol:mb-6
                prose-li:text-parchment/90 prose-li:mb-2
                prose-blockquote:border-l-parchment/30 prose-blockquote:text-parchment/80 prose-blockquote:my-6"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
