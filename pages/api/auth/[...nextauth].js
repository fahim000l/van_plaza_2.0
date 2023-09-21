import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { client, connectMongo } from "@/database/config";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: async (userProfile) => {
        await connectMongo().catch((err) =>
          res.json({ error: "Connection Failed...!" })
        );

        await client.connect();
        const usersCollection = client.db("van_plaza").collection("users");

        const requiredUser = await usersCollection.findOne({
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
          const confirmation = await usersCollection.insertOne({
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
        connectMongo().catch((err) =>
          res.json({ error: "Connection Failed...!" })
        );

        try {
          await client.connect();
          const usersCollection = client.db("van_plaza").collection("users");

          const isExist = await usersCollection.findOne({
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
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user?.role;
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) session.user.role = token?.role;
      return session;
    },
  },
});
