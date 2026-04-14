const APP_NAME = process.env.APP_NAME!;
const APP_ID = process.env.APP_ID!;
const APP_SECRET = process.env.APP_SECRET!;
const APP_URL = process.env.APP_URL!;
const SSO_CLIENT_HOST = process.env.SSO_CLIENT_HOST!;
const IS_PRODUCTION = process.env.IS_PRODUCTION! === 'true';

type CookieOptions = {
    path: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
    maxAge: number;
};

export const ssoConfig = {
    cookies: {
        session: {
            name: `${APP_NAME}.session-token`,
            options: {
                path: '/' as const,
                httpOnly: true,
                secure: IS_PRODUCTION,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
            } as CookieOptions,
        },
    },

    app: {
        id: APP_ID,
        name: APP_NAME,
        secret: APP_SECRET,
        url: APP_URL,
    },

    client: {
        host: SSO_CLIENT_HOST,
        path: {
            authorize: '/api/sso/authorize',
            token: '/api/sso/token',
            revoke: '/api/sso/revoke',
        },
    },
};
