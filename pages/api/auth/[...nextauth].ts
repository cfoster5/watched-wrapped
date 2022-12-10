import NextAuth from "next-auth";
import TraktProvider from "next-auth/providers/trakt";

export const authOptions = {
  providers: [
    // OAuth authentication providers..y.
    TraktProvider({
      clientId: process.env.TRAKT_ID,
      clientSecret: process.env.TRAKT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
