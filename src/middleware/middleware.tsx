// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL('/auth/sign-in', req.url));
//   }

//   return NextResponse.next();
// }

// // Sirf `/admin` routes ke liye middleware enable hoga
// export const config = {
//   matcher: '/admin/:path*',
// };



// export function Middleware(req: NextRequest) {
//     console.log("Middleware Token:", req.cookies.get('token')?.value);
  
//     const token = req.cookies.get('token')?.value;
  
//     if (!token) {
//       return NextResponse.redirect(new URL('/auth/sign-in', req.url));
//     }
  
//     return NextResponse.next();
//   }
  