import { NextResponse, type NextRequest } from "next/server";
import Session from "./services/session";

const publicRoutes = ["login", "logout", "signup"];

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname.slice(1);
  const isPublic = publicRoutes.includes(pathName);
  const hasSession = Session().get();

  if (isPublic && hasSession) {
    return NextResponse.redirect(
      new URL(process.env.DEFAULT_ROUTE!, request.url)
    );
  }

  if (!isPublic && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
