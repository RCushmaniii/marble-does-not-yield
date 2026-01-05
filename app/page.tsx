import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { detectLocale } from "@/lib/detect-locale";

/**
 * Root page detects browser language and redirects accordingly
 */
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = detectLocale(acceptLanguage);
  
  redirect(`/${locale}`);
}
