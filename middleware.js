import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken";
import { jwtVerify } from "jose";
// import type { NextRequest } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const sessionToken =
    request?.cookies?.get("next-auth.session-token")?.value ||
    request?.cookies?.get("__Secure-next-auth.session-token")?.value;
  const jwtToken = request?.cookies?.get("token")?.value;
  const userRole = jwtToken?.split("_role_")[1];

  const publicPath =
    path === "/signin" ||
    path === "/create-account" ||
    path === "/api/reset-password-request" ||
    path === "/api/reset-password";
  const userPath =
    path === "/profile" ||
    path === "/payment" ||
    path === "/checkout" ||
    path === "/api/delete-cart" ||
    path == "/api/delete-location" ||
    path === "/api/edit-location" ||
    path === "/api/edit-user-profile" ||
    path === "/api/get-db_user" ||
    path === "/api/payment-success" ||
    path === "/api/remove-cart" ||
    path === "/api/send-email" ||
    path === "/api/set-default-location" ||
    path === "/api/sign-jwt" ||
    path === "/api/store-cart" ||
    path === "/api/store-location" ||
    path === "/api/store-order" ||
    path === "/api/store-user-default-location" ||
    path === "/api/verify-email";
  const adminPath =
    path.includes("/dashboard") ||
    path === "/api/delete-category" ||
    path === "/api/delete-invoice" ||
    path === "/api/delete-product" ||
    path === "/api/delete-ps" ||
    path === "/api/delete-size" ||
    path === "/api/delete-supplier" ||
    path === "/api/edit-category" ||
    path === "/api/edit-invoice" ||
    path === "/api/edit-order-status" ||
    path === "/api/edit-product" ||
    path === "/api/edit-ps" ||
    path === "/api/edit-qs" ||
    path === "/api/edit-size-attr" ||
    path === "/api/edit-size" ||
    path === "/api/edit-supplier" ||
    path === "/api/get-all-invoices" ||
    path === "/api/get-all-orders" ||
    path === "/api/get-all-products" ||
    path === "/api/get-all-sizes" ||
    path === "/api/get-all-suppliers" ||
    path === "/api/store-invoices" ||
    path === "/api/store-new-category" ||
    path === "/api/store-new-product" ||
    path === "/api/store-new-size" ||
    path === "/api/store-new-supplier" ||
    path === "/api/store-products-stocks" ||
    path === "/api/store-quantities-stock" ||
    path === "/api/store-stock";

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
  matcher: [
    "/profile",
    "/",
    "/signin",
    "/create-account",
    "/dashboard",
    "/payment",
    "/checkout",
    "/api/delete-cart",
    "/api/delete-category",
    "/api/delete-invoice",
    "/api/delete-location",
    "/api/delete-product",
    "/api/delete-ps",
    "/api/delete-size",
    "/api/delete-supplier",
    "/api/edit-category",
    "/api/edit-invoice",
    "/api/edit-location",
    "/api/edit-order-status",
    "/api/edit-product",
    "/api/edit-ps",
    "/api/edit-qs",
    "/api/edit-size-attr",
    "/api/edit-size",
    "/api/edit-supplier",
    "/api/edit-user-profile",
    "/api/get-all-invoices",
    "/api/get-all-orders",
    "/api/get-all-products",
    "/api/get-all-sizes",
    "/api/get-all-suppliers",
    "/api/get-db_user",
    "/api/payment-success",
    "/api/remove-cart",
    "/api/reset-password-request",
    "/api/reset-password",
    "/api/send-email",
    "/api/set-default-location",
    "/api/sign-jwt",
    "/api/store-cart",
    "/api/store-invoices",
    "/api/store-location",
    "/api/store-new-category",
    "/api/store-new-product",
    "/api/store-new-size",
    "/api/store-new-supplier",
    "/api/store-order",
    "/api/store-products-stocks",
    "/api/store-quantities-stock",
    "/api/store-stock",
    "/api/store-user-default-location",
    "/api/verify-email",
  ],
};
