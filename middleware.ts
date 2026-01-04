import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a supported locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect root to default locale (handled by app/page.tsx, but this is a fallback)
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Detect preferred language from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  let preferredLocale = DEFAULT_LOCALE;

  if (acceptLanguage) {
    // Simple detection: check if "es" appears in accept-language
    if (acceptLanguage.toLowerCase().includes("es")) {
      preferredLocale = "es";
    }
  }

  // Redirect to localized path
  const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!api|_next|_static|_vercel|favicon.ico|images|.*\\..*).*)",
  ],
};
