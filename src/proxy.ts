import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authRoutes, publicRoutes, DEFAULT_ROUTE } from '@/routes';
import { auth, autoSignIn } from './auth';

const match = (currentPath: string, paths: string[]) => {
    return paths.some(path => {
        if (path.endsWith('*')) {
            return currentPath.startsWith(path.slice(0, -1));
        }
        return currentPath === path;
    });
};

export async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isAuthRoute = match(path, Object.values(authRoutes));
    const isPublicRoute = match(path, Object.values(publicRoutes));
    const isLoggedIn = await auth();

    // console.log('Middleware check:', { path, isAuthRoute, isPublicRoute, isLoggedIn });

    if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
        return autoSignIn(req);
    }

    if (isPublicRoute) return NextResponse.next();

    if (!isLoggedIn && !isAuthRoute) return NextResponse.redirect(new URL('/', req.nextUrl));

    if (isLoggedIn && isAuthRoute) return NextResponse.redirect(new URL(DEFAULT_ROUTE, req.nextUrl));

    return NextResponse.next();
}

// Configure which paths the middleware should run on
/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 * - public folder
 */
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.well-known).*)'],
};
