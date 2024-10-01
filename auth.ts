import process from 'node:process'
import GitHub from 'next-auth/providers/github'
import { UnstorageAdapter } from '@auth/unstorage-adapter'
import NextAuth, { type DefaultSession } from 'next-auth'
import { storage } from './lib/storage'

declare module 'next-auth' {
  interface Session {
    user: {
      /** 用户的 GitHub 用户名 */
      username: string
    } & DefaultSession['user']
  }

  interface User {
    /** 用户的 GitHub 用户名 */
    username: string
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: UnstorageAdapter(storage),
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          bio: profile.bio,
        }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.username = user.username
      }
      return session
    },
  },
  debug: process.env.NODE_ENV !== 'production',
})
