import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
 trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            "https://dummyjson.com/auth/login",
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (res.data?.accessToken) {
            // Return the full user object
            return {
              id: res.data.id,
              username: res.data.username,
              email: res.data.email,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              gender: res.data.gender,
              image: res.data.image,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            };
          }

          return null;
        } catch (error) {
          console.error("LOGIN FAILED:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Include all user fields in JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.gender = user.gender;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    // Make them available in session.user
    async session({ session, token }) {
      session.user = {
        id: token.id,
        username: token.username,
        firstName: token.firstName,
        lastName: token.lastName,
        gender: token.gender,
        email: token.email,
        image: token.image,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
