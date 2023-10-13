import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { client, connectMongo } from "@/database/config";
import { compare } from "bcrypt";
import users from "@/database/models/users";
import JWT from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: async (userProfile) => {
        await connectMongo().catch((err) =>
          res.json({ error: "Connection Failed...!" })
        );

        const requiredUser = await users.findOne({
          email: userProfile?.email,
        });

        if (requiredUser) {
          return {
            ...userProfile,
            image: requiredUser?.profilePic,
            id: requiredUser?._id?.toString(),
            role: requiredUser?.role || "user",
          };
        } else {
          const confirmation = await users.create({
            email: userProfile?.email,
            userName: userProfile?.name,
            profilePic: userProfile?.picture,
          });

          if (confirmation) {
            return {
              ...userProfile,
              image: userProfile?.picture,
              id: userProfile?.sub?.toString(),
              role: userProfile?.role || "user",
            };
          }
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          connectMongo().catch((err) =>
            res.json({ error: "Connection Failed...!" })
          );

          const isExist = await users.findOne({
            email: credentials.email,
          });

          if (!isExist) {
            throw new Error(
              "No user found with this email! Pease create account"
            );
          } else {
            const checkPassword = await compare(
              credentials.password,
              isExist.password
            );

            if (!checkPassword || isExist?.email !== credentials?.email) {
              throw new Error("User email or password doesn't match");
            } else {
              return isExist;
            }
          }
        } finally {
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    jwt: true, // Enable JSON Web Tokens for sessions
    maxAge: 24 * 60 * 60, // Set the session expiration to 2 minutes (120 seconds)
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user?.role;
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.role = token?.role;
        return session;
      }
    },
  },
});
