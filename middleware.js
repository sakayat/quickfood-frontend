import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/register" ||
    path === "/" ||
    path.startsWith("/about") ||
    path.startsWith("/restaurants") ||
    path.startsWith("/menu");

  const token = request.cookies.get("token")?.value || "";

  let response = NextResponse.next();

  if (isPublicPath && token) {
    if (path === "/login" || path === "/register") {
      return NextResponse.redirect(new URL("/profile", request.url));
    } else {
      return response;
    }
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/profile/:path*,",
    "/dashboard/:path*",
  ],
};
