import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";
import nextConfig from '../next.config.mjs';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const jwtCookieKey = nextConfig.env?.userSessionCookieKey as string;
    const userIdCookieKey = nextConfig.env?.userIdCookieKey as string;


    const isLoggedIn = cookies().get(jwtCookieKey);
    const pathname = request.nextUrl.pathname;


    if (pathname === '/logout') {
        const res = NextResponse.next();
        res.cookies.set(jwtCookieKey, "", {
            expires: new Date(0),
            path: '/',
            domain: nextConfig.env?.serverDomain,
        });
        res.cookies.set(userIdCookieKey, "", {
            expires: new Date(0),
            path: '/',
            domain: nextConfig.env?.serverDomain,
        });
        
        
        return res;
    }

    // if user is trying to access auth routes
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/feed/1', request.url));
        }
        return NextResponse.next();
    }

    if (isLoggedIn) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/battles/create',
        '/playlists/create',
        '/playlists/my-playlists/:path*',
        '/profile/me/:path*',
        '/login/:path*',
        '/register/:path*',
        '/logout'
    ],
}