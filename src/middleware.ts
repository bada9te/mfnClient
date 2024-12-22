import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import envCfg from './app/config/env';
import { match } from '@formatjs/intl-localematcher'
// @ts-ignore
import Negotiator from 'negotiator'

export const locales = ['en', 'de', 'uk', 'ru'];

let protectedRoutes = [
    '/battles/create',
    '/battles/finished/me',
    '/playlists/create',
    '/playlists/my-playlists',
    '/profile/me',
];

function getLocale(request: NextRequest) {
    if (cookies().has("language")) {
        const cookieLANG = cookies().get("language")?.value;
        if (locales.includes(cookieLANG as string)) {
            return cookieLANG;
        }
    }
    let languages = new Negotiator({ headers: request.headers });
    let defaultLocale = 'en';
    return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
    const isLoggedIn = cookies().get(envCfg.userIdCookieKey as string)?.value;

    const pathname = request.nextUrl.pathname;

    // check if pathname already has a locale identifier
    let urlLocale;
    const pathnameHasLocale = locales.some((locale) => {
        if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
            urlLocale = locale;
            return true;
        }
        return false;
    });

    // specify locale if not pre-defined
    if (!urlLocale) {
        urlLocale = getLocale(request);
    }
    if (!pathnameHasLocale) {
        request.nextUrl.pathname = `/${urlLocale}${pathname}`;
    }

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

    const accessingProtectedRoute = protectedRoutes.some(i => pathname.includes(i));

    if (!accessingProtectedRoute || isLoggedIn) {
        if (!pathnameHasLocale) {
            return NextResponse.redirect(request.nextUrl);
        } else {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL(`/${urlLocale}/login`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|assets|favicon.ico).*)',
    ],
}
