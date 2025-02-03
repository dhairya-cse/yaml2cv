import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token; // Store the access token
      }
      
      if (profile && profile.preferred_username) {
        token.preferred_username = profile.preferred_username;
      }
  
      return token;
    },
  
    async session({ session, token }) {
      if (session?.user && token?.preferred_username) {
        session.user.preferred_username = token.preferred_username;
      }
        
      return session;
    },
  }
})