import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken";
import { jwtVerify } from "jose";
// import type { NextRequest } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const sessionToken =
    request?.cookies?.get("next-auth.session-token")?.value ||
    request?.cookies?.get("_Secure-next-auth.session-token")?.value;
  const jwtToken = request?.cookies?.get("token")?.value;
  const userRole = jwtToken?.split("_role_")[1];

  const publicPath = path === "/signin" || path === "/create-account";
  const userPath = path === "/profile";
  const adminPath = path.includes("/dashboard");

  if (userRole !== "admin" && adminPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (publicPath && sessionToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (userPath && !sessionToken) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/", "/signin", "/create-account", "/dashboard"],
};
