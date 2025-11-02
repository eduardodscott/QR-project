import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        // Fetch user role from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        })
        if (dbUser) {
          session.user.id = dbUser.id
          session.user.role = dbUser.role
        }
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // Set admin role if email matches ADMIN_EMAIL
      if (user.email === process.env.ADMIN_EMAIL) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: 'ADMIN' },
        })
      }
    },
  },
  pages: {
    signIn: '/en/auth/signin',
  },
  session: {
    strategy: 'database',
  },
}

