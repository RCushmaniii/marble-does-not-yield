import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_LOCALES } from "./lib/i18n";
import { detectLocale } from "./lib/detect-locale";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow /docs routes without language redirection
  if (pathname.startsWith("/docs")) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect root to default locale (handled by app/page.tsx)
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Detect preferred language from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  const preferredLocale = detectLocale(acceptLanguage);

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
