"use client";

import { useState } from "react";
import Link from "next/link";

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

interface DocViewerProps {
  slug: string;
  content: string;
}

export default function DocViewer({ slug, content }: DocViewerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentDoc = DOCS_NAV.find((doc) => doc.slug === slug);

  return (
    <div className="min-h-screen bg-void text-parchment overflow-x-hidden">
      {/* Mobile Header */}
      <div className="docs:hidden fixed top-0 left-0 right-0 bg-black/90 border-b border-parchment/10 z-50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-parchment/60 hover:text-parchment text-sm">
            ← Back
          </Link>
          <h2 className="text-sm font-display font-semibold text-parchment truncate mx-4">
            {currentDoc?.title}
          </h2>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-parchment p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar Navigation - Desktop */}
        <aside className="hidden docs:block w-64 min-h-screen bg-black/30 border-r border-parchment/10 fixed left-0 top-0 overflow-y-auto">
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

        {/* Mobile Sidebar Navigation */}
        {mobileMenuOpen && (
          <aside className="docs:hidden fixed inset-0 bg-black/95 z-40 overflow-y-auto pt-16">
            <div className="p-6">
              <h2 className="text-lg font-display font-semibold mb-4 text-parchment">
                Documentation
              </h2>
              <nav className="space-y-1">
                {DOCS_NAV.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
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
        )}

        {/* Main Content */}
        <main className="w-full docs:ml-64 flex-1 px-4 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12 pt-20 docs:pt-8">
          <div className="max-w-4xl mx-auto overflow-hidden">
            <div className="mb-6 md:mb-8 hidden docs:block">
              <h1 className="text-xl md:text-2xl docs:text-3xl font-display font-bold text-parchment mb-2">
                {currentDoc?.title}
              </h1>
              <div className="h-px bg-parchment/20 w-full" />
            </div>
            
            <article
              className="prose prose-invert prose-parchment max-w-none break-words overflow-hidden
                prose-headings:font-display prose-headings:text-parchment prose-headings:leading-tight prose-headings:break-words prose-headings:overflow-wrap-anywhere
                prose-h1:text-lg prose-h1:md:text-xl prose-h1:lg:text-2xl prose-h1:mb-4 prose-h1:break-all prose-h1:max-w-full
                prose-h2:text-lg prose-h2:md:text-xl prose-h2:lg:text-2xl prose-h2:mb-3
                prose-h3:text-base prose-h3:md:text-lg prose-h3:lg:text-xl prose-h3:mb-3
                prose-h4:text-base prose-h4:md:text-base prose-h4:lg:text-lg prose-h4:mb-2
                prose-p:text-sm prose-p:md:text-base prose-p:lg:text-base prose-p:text-parchment/90 prose-p:leading-relaxed prose-p:md:leading-loose prose-p:mb-4 prose-p:md:mb-6 prose-p:break-words
                prose-a:text-parchment prose-a:underline prose-a:decoration-parchment/30 prose-a:break-words
                hover:prose-a:decoration-parchment
                prose-strong:text-parchment prose-strong:font-semibold
                prose-code:text-xs prose-code:md:text-sm prose-code:text-parchment/90 prose-code:bg-black/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:break-all
                prose-pre:text-xs prose-pre:md:text-sm prose-pre:bg-black/50 prose-pre:border prose-pre:border-parchment/10 prose-pre:my-4 prose-pre:md:my-6 prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:p-3 prose-pre:md:p-4
                prose-ul:text-sm prose-ul:md:text-base prose-ul:text-parchment/90 prose-ul:leading-relaxed prose-ul:md:leading-loose prose-ul:mb-4 prose-ul:md:mb-6
                prose-ol:text-sm prose-ol:md:text-base prose-ol:text-parchment/90 prose-ol:leading-relaxed prose-ol:md:leading-loose prose-ol:mb-4 prose-ol:md:mb-6
                prose-li:text-parchment/90 prose-li:mb-1 prose-li:md:mb-2 prose-li:break-words
                prose-blockquote:text-sm prose-blockquote:md:text-base prose-blockquote:border-l-parchment/30 prose-blockquote:text-parchment/80 prose-blockquote:my-4 prose-blockquote:md:my-6"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
