'use server';

import { cookies } from 'next/headers';
import { Session } from '@/types/auth';
import ssoClient from '@/lib/sso-client';
import { decodeJWT } from '@/utils/jwt';
import { ssoConfig } from '@/configs/sso';
import getRedis from '@/lib/redis';
import { RedisKeys } from '@/constants/keys';
import { redirect } from 'next/navigation';
import { getSSOAuthorizationURL } from '@/utils/sso';

export async function auth(): Promise<Session | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(ssoConfig.cookies.session.name)?.value;
    return decodeJWT(token);
}

export async function isSessionValid(): Promise<boolean> {
    const redis = getRedis();
    const session = await auth();
    if (!session) return false;

    const isSessionValid = await redis.get(RedisKeys.clientSession + session.sid);
    return !!isSessionValid;
}

export async function logout() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ssoConfig.cookies.session.name)?.value;

    try {
        const res = await ssoClient.post(
            ssoConfig.client.path.revoke,
            { client_id: ssoConfig.app.id },
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
        cookieStore.delete(ssoConfig.cookies.session.name);
        const authURL = getSSOAuthorizationURL();
        redirect(authURL.href);
    }
}
