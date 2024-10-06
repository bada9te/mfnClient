import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import envCfg from './config/env';
import { match } from '@formatjs/intl-localematcher'
// @ts-ignore
import Negotiator from 'negotiator'

export const locales = ['en', 'de', 'uk', 'ru'];

let protectedRoutes = [
    '/battles/create',
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

async function getCookies(request: NextRequest) {
    const apiUrl = `${envCfg.me}/api/get-server-data`;

    const apiResponse = await fetch(apiUrl, {
        headers: {
            cookie: request.headers.get('cookie') || '', // Pass cookies along if needed
        },
    });

    const data = await apiResponse.json();

    return data;
}

export async function middleware(request: NextRequest) {
    const data = await getCookies(request);

    const isLoggedIn = data.cookie.jwt && data.cookie.id;

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

    // if user wants to logout
    /*
        if (request.nextUrl.pathname === `/${urlLocale}/logout`) {
            const res = NextResponse.redirect(new URL(`/${urlLocale}`, request.url));
            res.cookies.set(envCfg.userIdCookieKey as string, "", {
                expires: new Date(0),
                path: '/',
                domain: envCfg.serverDomain,
            });

            res.cookies.set(envCfg.userSessionCookieKey as string, "", {
                expires: new Date(0),
                path: '/',
                domain: envCfg.serverDomain,
            });

            return res;
        }
    */

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
