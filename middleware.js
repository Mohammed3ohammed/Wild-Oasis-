// import { auth } from "@/app/lib/auth";

// export const middleware = auth;

// export const config = {
//   matcher: ["/account"],
// };

// import { withAuth } from "next-auth/middleware";

// export const middleware = withAuth({
//   secret: process.env.NEXTAUTH_SECRET, // فقط secret
//   pages: { signIn: "/login" },        // صفحة تسجيل الدخول
// });

// export const config = {
//   matcher: ["/account", "/profile"],   // الصفحات المحمية
// };

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};