import fs from "fs/promises";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * Load and parse the story markdown file
 */
export async function getStoryContent(): Promise<string> {
  const filePath = path.join(process.cwd(), "content", "story.md");

  try {
    const fileContent = await fs.readFile(filePath, "utf8");

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(fileContent);

    return processedContent.toString();
  } catch (error) {
    console.error("Error loading story:", error);
    throw new Error("Failed to load story content");
  }
}

/**
 * Parse HTML string and inject image markers
 */
export function parseStoryWithImages(html: string): Array<{
  type: "html" | "ending";
  content: string;
}> {
  const parts: Array<{ type: "html" | "ending"; content: string }> = [];

  // Strip out any TRANSITION_IMAGE tokens
  const cleanedHtml = html.replace(/\[\[TRANSITION_IMAGE\]\]/g, "");

  // Split by ending token
  const endingSplit = cleanedHtml.split("[[ENDING_IMAGE]]");

  if (endingSplit.length > 1) {
    parts.push({ type: "html", content: endingSplit[0] });
    parts.push({ type: "ending", content: "" });
    if (endingSplit[1]) {
      parts.push({ type: "html", content: endingSplit[1] });
    }
  } else {
    // No ending token, return as single HTML block with ending at end
    parts.push({ type: "html", content: cleanedHtml });
    parts.push({ type: "ending", content: "" });
  }

  return parts;
}
