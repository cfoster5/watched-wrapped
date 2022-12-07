import NextAuth from "next-auth";
import TraktProvider from "next-auth/providers/trakt";
import { decode } from "next-auth/jwt";

export const authOptions = {
  providers: [
    // OAuth authentication providers..y.
    TraktProvider({
      clientId: process.env.TRAKT_ID,
      clientSecret: process.env.TRAKT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return session;
    },
  },
};

export default NextAuth(authOptions);
