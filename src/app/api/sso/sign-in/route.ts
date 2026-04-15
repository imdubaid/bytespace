import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { IS_PRODUCTION } from '@/lib/env';
import { getSSOAuthorizationURL } from '@/utils/sso';

export async function GET(req: NextRequest) {
    const path = req.nextUrl.searchParams.get('path') ?? '/';

    const next = new URL(path, req.nextUrl.origin).href;
    const authURL = getSSOAuthorizationURL(next);

    const response = NextResponse.redirect(authURL);
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
