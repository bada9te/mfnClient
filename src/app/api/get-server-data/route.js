// src/app/api/get-server-data/route.js
import envCfg from '@/config/env';
import { cookies } from 'next/headers';

export async function GET(request) {
    // Access cookies or perform other server-side logic
    const cookieValueID = cookies().get(envCfg.userIdCookieKey)?.value;
    const cookieValueJWT = cookies().get(envCfg.userSessionCookieKey)?.value;

    console.log({cookieValueID, cookieValueJWT, userIdKEY: envCfg.userIdCookieKey, sessionKEY: envCfg.userSessionCookieKe})

    // You can also perform any other server-side logic here, like fetching from a DB
    return new Response(JSON.stringify({ 
        message: 'Server data', 
        cookie: { 
            jwt: cookieValueJWT,
            id: cookieValueID,
        } 
    }), {
        headers: { 'Content-Type': 'application/json' },
    });
}