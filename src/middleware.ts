import { NextRequest, NextResponse } from "next/server";

const publicPages = [
  "/auth/login",
  "/auth/signup",
  "/",
  "/properties",
  "/property/*",
  "/contact",
  "/about",
  "/help",
  "/success",
];

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const token = req.cookies.get("userID")?.value;

  // Skip for chrome-specific paths
  if (path.indexOf("chrome") > -1) {
    return NextResponse.next();
  }
  const publicPathnameRegex = RegExp(
    `^(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(path);

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/auth/login/", req.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
