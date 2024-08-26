import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies, headers} from "next/headers";
import envCfg from './config/env';
import { match } from '@formatjs/intl-localematcher'
// @ts-ignore
import Negotiator from 'negotiator'

let locales = ['en', 'de', 'uk', 'ru'];

let protectedRoutes = [
    '/battles/create',
    '/playlists/create',
    '/playlists/my-playlists',
    '/profile/me',
];

function getLocale(request: NextRequest) {
    let languages = new Negotiator({ headers: request.headers });
    let defaultLocale = 'en';
    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const jwtCookieKey = envCfg.userSessionCookieKey as string;
    const userIdCookieKey = envCfg.userIdCookieKey as string;


    const isLoggedIn = cookies().get(jwtCookieKey);

    //console.log("LOG:", isLoggedIn, jwtCookieKey, userIdCookieKey);
    const pathname = request.nextUrl.pathname;
    
    // if user wants to logout
    if (pathname === '/logout') {
        const res = NextResponse.next();
        res.cookies.set(jwtCookieKey, "", {
            expires: new Date(0),
            path: '/',
            domain: envCfg.serverDomain,
        });
        res.cookies.set(userIdCookieKey, "", {
            expires: new Date(0),
            path: '/',
            domain: envCfg.serverDomain,
        });
        
        return res;
    }

    // check if pathname already has a locale identifier
    let urlLocale;
    const pathnameHasLocale = locales.some(
        (locale) => {
            if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
                urlLocale = locale;
                return true;
            }
            return false;
        }
    );
    
    // specify locale if not pre-defined
    if (!urlLocale) {
        urlLocale = getLocale(request);
        //console.log(urlLocale)
    }
    if (!pathnameHasLocale) {
        request.nextUrl.pathname = `/${urlLocale}${pathname}`;
    }

    //console.log("TARGET:", request.nextUrl.pathname)

    // if user is trying to access auth routes
    if (pathname.startsWith(`${urlLocale}/login`) || pathname.startsWith(`${urlLocale}/register`)) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(`/${urlLocale}/feed/1`, request.url));
        }

        if (!pathnameHasLocale) {
            return NextResponse.redirect(request.nextUrl);
        } else {
            return NextResponse.next();
        }
    }

    if (isLoggedIn) {
        if (!pathnameHasLocale) {
            return NextResponse.redirect(request.nextUrl);
        } else {
            return NextResponse.next();
        }
    }


    const accessingProtectedRoute = protectedRoutes.some(i => {
        return pathname.startsWith(i);
    });

    if (!accessingProtectedRoute) {
        if (!pathnameHasLocale) {
            return NextResponse.redirect(request.nextUrl);
        } else {
            return NextResponse.next();
        }
    }
    
    
    return NextResponse.redirect(new URL(`/${urlLocale}/login`, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|assets|favicon.ico).*)',
    ],
}