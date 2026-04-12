'use server';

import { cookies } from 'next/headers';
import { Session } from '@/types/auth';
import ssoClient from '@/lib/sso-client';
import { CLIENT_ID, CLIENT_NAME } from '@/lib/env';
import { decodeJWT } from '@/utils/session-token';
import { ssoConfig } from '@/configs/sso';

const cookieName = `${CLIENT_NAME}.session-token`;

export async function auth(): Promise<Session | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(cookieName)?.value;
    return decodeJWT(token);
}

export async function logout() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(cookieName)?.value;

    try {
        const res = await ssoClient.post(
            ssoConfig.paths.revoke,
            { client_id: CLIENT_ID },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        console.log('Logout response:', res.data);
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // cookieStore.delete(cookieName);
        // redirect('/');
    }
}
