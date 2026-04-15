import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJWT } from '@/utils/jwt';
import { publicRoutes } from '@/routes';
import { ssoConfig } from '@/configs/sso';
import getRedis from './lib/redis';
import { RedisKeys } from './constants/keys';

const match = (currentPath: string, paths: string[]) => {
    return paths.some(path => {
        if (path.endsWith('*')) {
            return currentPath.startsWith(path.slice(0, -1));
        }
        return currentPath === path;
    });
};

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = match(path, Object.values(publicRoutes));
    const ssoAttempted = req.cookies.get('sso_attempted')?.value === 'true';
    const ssoRedirectCount = parseInt(req.cookies.get('sso_redirect_count')?.value ?? '0', 10);

    const redis = getRedis();
    const token = req.cookies.get(ssoConfig.cookies.session.name)?.value;
    const session = decodeJWT(token);
    console.log('session', session);
    const isSessionValid = await redis.exists(RedisKeys.clientSession + session?.sid);
    const isTokenExpired = typeof session?.exp === 'number' && session.exp <= Math.floor(Date.now() / 1000);

    const isLoggedIn = !!session && !isTokenExpired;

    if (isPublicRoute) return NextResponse.next();

    console.log('isLoggedIn', isLoggedIn, 'IsSessionValid', isSessionValid);

    if (!isSessionValid) {
        if (ssoRedirectCount >= 3) {
            return NextResponse.redirect(new URL('/error?error=SSO redirect limit exceeded', req.url));
        }

        if (!ssoAttempted) {
            const path = req.nextUrl.pathname + req.nextUrl.search;
            const signIn = new URL(publicRoutes.signIn, req.url);
            signIn.searchParams.set('path', path);
            return NextResponse.redirect(signIn);
        }

        return NextResponse.redirect(new URL('/error?error=sso_timeout', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images|public|assets|.well-known).*)'],
};
