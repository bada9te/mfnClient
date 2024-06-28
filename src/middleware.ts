import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isLoggedIn = cookies().get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY as string);
    const pathname = request.nextUrl.pathname;

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
    ],
}