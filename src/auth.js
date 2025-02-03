import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (profile) {
        token.preferred_username = profile.preferred_username; // Add preferred_username to token
      }
      console.log(token, account, user, profile);
      return token;
    },
    async session({ session, token }) {
      session.user.preferred_username = token.preferred_username; // Pass preferred_username to session
      return session;
    },
  }
})