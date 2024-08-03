import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { storage } from "./lib/storage";
import { UnstorageAdapter } from "@auth/unstorage-adapter";
import { initData } from "./lib/github";

declare module "next-auth" {
    interface Session {
      user: {
        username: string
      } & DefaultSession["user"]
    }

    interface User {
        username: string
    }
  }

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: UnstorageAdapter(storage),
    providers: [
        GitHub({
            async profile(profile) {
                return {
                    id: profile.id.toString(),
                    username: profile.login,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url
                };
            }
        })
    ],
    callbacks: {
        session({ session, user }) {
            session.user.username = user.username;
            return session;
        },
        async signIn({ user }) {
            // 登录成功后，初始化数据
            await initData(user.username);
            return true;
        },
    },
    // debug: process.env.NODE_ENV !== "production" ? true : false
});