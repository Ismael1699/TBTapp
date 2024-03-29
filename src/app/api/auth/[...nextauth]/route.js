import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pool } from '../../../../database/db';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const [userFound] = await pool.query(
          `SELECT * FROM users WHERE email = "${credentials.email}"`
        );

        if (userFound.length === 0) throw new Error('No tienes acceso');

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound[0].password
        );
        if (!passwordMatch) throw new Error('No tienes acceso');
        return userFound[0];
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user, profile, session }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token, user }) {
      delete token.user.password;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
