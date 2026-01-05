import { redirect } from "next/navigation";

/**
 * Root docs page redirects to index
 */
export default function DocsPage() {
  redirect("/docs/INDEX");
}
