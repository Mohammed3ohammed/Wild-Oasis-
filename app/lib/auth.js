// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { createGuest, getGuest } from "./data-service";
// // import { createGuest, getGuest } from "./data-service";

// export const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       const existingGuest = await getGuest(user.email);

//       if (!existingGuest)
//         await createGuest({ email: user.email, fullName: user.name });

//       return true;
//     },

//     async session({ session }) {
//       const guest = await getGuest(session.user.email);
//       session.user.guestId = guest.id;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authConfig);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingGuest = await getGuest(user.email);

      if (!existingGuest) {
        await createGuest({
          email: user.email,
          fullName: user.name,
        });
      }

      return true;
    },

    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authConfig);
export { handler as auth }; 
export default handler; 