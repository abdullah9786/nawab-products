import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/lib/db/connection'
import { Admin } from '@/lib/db/models'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('\n🔐 === LOGIN ATTEMPT ===')
        console.log('📧 Email:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing email or password')
          throw new Error('Please enter email and password')
        }

        await dbConnect()

        console.log('🔍 Looking for admin with email:', credentials.email)
        const admin = await Admin.findOne({ email: credentials.email }).select('+password')

        if (!admin) {
          console.log('❌ No admin found with this email')
          console.log('💡 Have you visited /api/seed to create the admin user?')
          throw new Error('Invalid credentials')
        }

        console.log('✅ Admin found:', admin.email)
        console.log('🔑 Checking password...')
        
        const isPasswordValid = await admin.comparePassword(credentials.password)
        console.log('🔑 Password valid:', isPasswordValid)

        if (!isPasswordValid) {
          console.log('❌ Password does not match')
          throw new Error('Invalid credentials')
        }

        console.log('✅ Login successful!')
        return {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

