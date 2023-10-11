import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin";
  const token = request?.cookies?.get("next-auth.session-token");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/", "/signin"],
};
