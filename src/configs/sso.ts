import { CLIENT_NAME, IS_PRODUCTION } from '@/lib/env';

export const ssoConfig = {
    cookies: {
        session: {
            name: `${CLIENT_NAME}.session-token`,
            options: {
                path: '/' as const,
                httpOnly: true,
                secure: IS_PRODUCTION,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
            },
        },
    },

    paths: {
        authorize: '/api/sso/authorize',
        token: '/api/sso/token',
        revoke: '/api/sso/revoke',
    },
};
