'use server';

import { cookies } from 'next/headers';
import { Session } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { authRoutes } from './routes';

export async function auth(): Promise<Session | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth.session-token')?.value;

    if (!token) return null;

    return jwtDecode(token) as Session;
}

export async function autoSignIn(req: NextRequest) {
    const nextUrl = req.nextUrl.clone();

    const next = encodeURIComponent(req.url);
    const clientId = process.env.CLIENT_ID!;
    const redirectURI = encodeURIComponent(`${req.nextUrl.origin}/api/sso/callback`);

    const redirect = new URL(`${authRoutes.auth}?client_id=${clientId}&redirect_uri=${redirectURI}&next=${next}`);

    nextUrl.href = redirect.toString();
    return NextResponse.redirect(redirect);
}

// export async function logout() {
//     cookies().delete('token');
//     redirect('/auth/login');
// }
