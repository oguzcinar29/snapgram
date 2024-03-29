import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrpyt from "bcrypt";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image: string;
    } & DefaultSession["user"];
  }
}
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {},
        email: {},
        password: {},
        image: {},
      },
      async authorize(credentials, req) {
        await connectToDatabase();
        const email = credentials?.email;

        const password = credentials?.password || "";
        const user = await User.find({ email });

        if (user.length === 0) {
          return null;
        } else {
          const isCorrectPass = await bcrpyt.compare(
            password,
            user[0].password
          );
          if (isCorrectPass) {
            console.log(user);

            return {
              id: user[0]._id,
              email: user[0].email,
              name: user[0].name,
              image: user[0].image,
            };
          } else {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        image: token.picture,
      },
    }),
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name && session?.image) {
        token.name = session.name;
        token.picture = session.image;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
