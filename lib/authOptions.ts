// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosBase } from "@/lib/axios/base"; // axios custom instance
import { TResponse } from "@/types/apiType";
import { TLogin } from "@/types/auth/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axiosBase.post<TResponse<TLogin>>("/api/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          })

          const { access_token, refresh_token, user } = res.data.data;

          if (user) {
            return {
              ...user,
              accessToken: access_token,
              refreshToken: refresh_token,
            };
          }

          return null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login", // custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};
