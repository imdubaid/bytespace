'use server';

import { cookies } from 'next/headers';
import { Session } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { authRoutes } from './routes';
import ssoClient from './lib/ssoClient';
import { CLIENT_ID, CLIENT_NAME } from './lib/env';

export async function auth(): Promise<Session | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(CLIENT_NAME + '.session-token')?.value;

    if (!token) return null;

    return jwtDecode(token) as Session;
}

export async function autoSignIn(req: NextRequest) {
    const nextUrl = req.nextUrl.clone();

    const next = encodeURIComponent(req.url);
    const redirectURI = encodeURIComponent(`${req.nextUrl.origin}/api/sso/callback`);

    const redirect = new URL(`${authRoutes.auth}?client_id=${CLIENT_ID}&redirect_uri=${redirectURI}&next=${next}`);

    nextUrl.href = redirect.toString();
    return NextResponse.redirect(redirect);
}

export async function logout() {
    try {
        await ssoClient.post('/api/sso/revoke', { client_id: CLIENT_ID });
    } catch (error) {
        console.error('Logout error:', error);
    }
}
