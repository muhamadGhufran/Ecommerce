import {compare} from 'bcrypt'
import NextAuth, { NextAuthOptions} from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {mongooseConnect} from "@/lib/mongoose";
import User from '@/models_client/user'
import Admin from '@/models_admin/admin';

const options = {
  providers: [
      CredentialsProvider({
          id: "credentials",
          name: "Credentials",
          credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
              await mongooseConnect().catch(err => { throw new Error(err) });

              let user;

               user = await User.findOne({email: credentials?.email}).select("+password");

               if (!user) {
                user = await Admin.findOne({ emailAdmin: credentials?.emailAdmin }).select('+password');
              }

              if (!user) {
                  throw new Error("Invalid credentials");
              }

              const isPasswordCorrect = await compare(credentials.password, user.password);

              if (!isPasswordCorrect) {
                  throw new Error("Invalid credentials");
              }

              return user;
          }
      })
  ],
  pages: {
      signIn: "/login"
  },
  session: {
      strategy: "jwt"
  },
  callbacks: {
      jwt: async ({ token, user }) => {
          user && (token.user = user);
          return token;
      },
      session: async ({ session, token }) => {
          const user = token.user;
          session.user = user;
          return session;
      }
  }
};

export default NextAuth(options)