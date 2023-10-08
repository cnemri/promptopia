import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  async session({ session }: any) {
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser?._id;

    return session;
  },
  async signIn({ profile }: any) {
    try {
      await connectToDB();
      // check if user already exists in database
      const userExists = await User.findOne({ email: profile.email });

      // if not, create user in database
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
    } catch (error) {}
  },
});

export { handler as GET, handler as POST };
