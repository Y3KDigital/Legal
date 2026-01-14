import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';
import { Role, hasPermission } from '@mcp-law/types';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role as Role;
      }

      // Refresh user data on every token access
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        });

        if (dbUser) {
          token.role = dbUser.role as Role;
          token.email = dbUser.email;
          token.name = dbUser.name;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      // Log sign-in event for audit trail
      console.log(`User signed in: ${user.email} via ${account?.provider}`);
    },
    async signOut({ token }) {
      // Log sign-out event for audit trail
      console.log(`User signed out: ${token?.email}`);
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

/**
 * Type-safe session helper that includes user role and permissions
 */
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
  };
}

/**
 * Check if the current user has permission to perform an action
 * 
 * @param session - Current session
 * @param action - Action to check (e.g., 'projects:create', 'gates:approve')
 * @returns true if user has permission, false otherwise
 */
export function checkPermission(
  session: AuthSession | null,
  action: string
): boolean {
  if (!session?.user?.role) {
    return false;
  }

  return hasPermission(session.user.role, action);
}

/**
 * Throw an error if the user doesn't have permission
 * 
 * @param session - Current session
 * @param action - Action to check
 * @throws Error if user doesn't have permission
 */
export function requirePermission(
  session: AuthSession | null,
  action: string
): void {
  if (!checkPermission(session, action)) {
    throw new Error(`Permission denied: ${action}`);
  }
}

/**
 * Hash a password using bcrypt
 * 
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify a password against a hash
 * 
 * @param password - Plain text password
 * @param hashedPassword - Hashed password
 * @returns true if password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
