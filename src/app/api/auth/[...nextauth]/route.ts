import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials 1", credentials);

        // const { email, password } = loginUserSchema.parse(credentials);
        const { email, password } = credentials as { email: string, password: string }
        if (!email || !password) throw new Error("Invalid login credentials")

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) throw new Error("No user found");

        const isPasswordValid = await bcrypt.compare(password, user.password as string);

        if (!isPasswordValid) throw new Error("Invalid login credentials");
        console.log("user", user);

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        console.log("account", account);
      }
      if (credentials) {
        console.log("credentials", credentials);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      const { id } = await prisma.user.findUnique({
        where: { email: token.email as string }
      }) as { id: string }
      session.user.id = id
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
