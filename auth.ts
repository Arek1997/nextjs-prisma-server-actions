import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcript from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/login" },
  secret: process.env.AUTH_SECRET,
  session: { maxAge: 3600, updateAge: 1800 },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.users.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcript.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId;

      return session;
    },
  },
});
