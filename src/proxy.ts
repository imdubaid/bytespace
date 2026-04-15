import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { publicRoutes } from '@/routes';
import { isSessionValid } from './actions/auth';
import { ssoConfig } from './configs/sso';

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
    const token = req.cookies.get(ssoConfig.cookies.session.name)?.value;
    const isLoggedIn = await isSessionValid(token);

    if (isPublicRoute) return NextResponse.next();

    if (!isLoggedIn) {
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
