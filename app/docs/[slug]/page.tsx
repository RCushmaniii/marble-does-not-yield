import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import DocViewer from "./DocViewer";

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
    
    // Remove the first H1 (filename) and file/purpose metadata block
    // This removes: # TITLE, **File:** ..., **Purpose:** ..., and the --- separator
    fileContent = fileContent.replace(
      /^#[^\n]+\n\s*\*\*File:\*\*[^\n]+\n\s*\*\*Purpose:\*\*[^\n]+\n\s*---\s*\n/m,
      ""
    );
    
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
    
    return fileContent;
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

  return <DocViewer slug={slug} content={content} />;
}
