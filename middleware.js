// import { auth } from "@/app/lib/auth";

// export const middleware = auth;

// export const config = {
//   matcher: ["/account"],
// };

import { withAuth } from "next-auth/middleware";

export const middleware = withAuth({
  secret: process.env.NEXTAUTH_SECRET, // فقط secret
  pages: { signIn: "/login" },        // صفحة تسجيل الدخول
});

export const config = {
  matcher: ["/account", "/profile"],   // الصفحات المحمية
};