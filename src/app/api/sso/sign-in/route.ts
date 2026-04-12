import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CLIENT_ID, IS_PRODUCTION } from '@/lib/env';
import { authRoutes } from '@/routes';

export async function GET(req: NextRequest) {
    const path = req.nextUrl.searchParams.get('path') ?? '/';

    const next = new URL(path, req.nextUrl.origin).href;
    const redirectURI = `${req.nextUrl.origin}/api/sso/callback`;

    const authorize = new URL(authRoutes.auth);
    authorize.searchParams.set('client_id', CLIENT_ID);
    authorize.searchParams.set('redirect_uri', redirectURI);
    authorize.searchParams.set('next', next);

    const response = NextResponse.redirect(authorize);

    response.cookies.set('sso_attempted', 'true', {
        path: '/',
        httpOnly: true,
        maxAge: 120,
        sameSite: 'lax',
        secure: IS_PRODUCTION,
    });

    const currentCount = parseInt(req.cookies.get('sso_redirect_count')?.value ?? '0', 10);
    response.cookies.set('sso_redirect_count', String(Number.isFinite(currentCount) ? currentCount + 1 : 1), {
        path: '/',
        httpOnly: true,
        maxAge: 120,
        sameSite: 'lax',
        secure: IS_PRODUCTION,
    });

    return response;
}
