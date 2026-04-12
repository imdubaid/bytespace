import { CLIENT_ID, CLIENT_NAME, IS_PRODUCTION } from '@/lib/env';
import ssoClient from '@/lib/sso-client';
import { error, next } from '@/utils/sso';

function sessionCookieOptions() {
    return {
        path: '/' as const,
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: (IS_PRODUCTION ? 'none' : 'lax') as 'none' | 'lax',
        maxAge: 60 * 60 * 24,
    };
}

const cookieName = `${CLIENT_NAME}.session-token`;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const nextParam = searchParams.get('next') ?? '/';

    if (!code) {
        return error('Missing authorization code');
    }

    try {
        const res = await ssoClient.post('/api/sso/token', { code, client_id: CLIENT_ID });
        const token = res.data?.access_token;

        if (!token) {
            return error('No access token from SSO');
        }

        const response = next(nextParam);
        response.cookies.set(cookieName, token, sessionCookieOptions());
        return response;
    } catch (err) {
        console.error('SSO callback error:', err);
        return error('Authentication failed: Unable to complete SSO process');
    }
}
