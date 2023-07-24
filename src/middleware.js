import { NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

// export function middleware(req) {
//   const pathname = req.nextUrl.pathname;
//   console.log(pathname);
//   const matchPath = pathname === '/';
//   console.log(matchPath);
//   if (matchPath) return NextResponse.redirect(new URL('/compras', req.url));
// }

export const config = {
  matcher: ['/compras/:path*'],
  pages: {
    signIn: '/sign-in',
  },
};
