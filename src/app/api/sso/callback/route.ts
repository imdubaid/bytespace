import ssoClient from '@/lib/sso-client';
import { error, next } from '@/utils/sso';
import { ssoConfig } from '@/configs/sso';

const cookieName = ssoConfig.cookies.session.name;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const nextParam = searchParams.get('next') ?? '/';

    if (!code) {
        return error('Missing authorization code');
    }

    try {
        const res = await ssoClient.post(ssoConfig.client.path.token, { code, client_id: ssoConfig.app.id });
        const token = res.data?.access_token;

        if (!token) {
            return error('No access token from SSO');
        }

        const response = next(nextParam);
        response.cookies.set(cookieName, token, ssoConfig.cookies.session.options);
        return response;
    } catch (err) {
        console.error('SSO callback error:', err);
        return error('Authentication failed: Unable to complete SSO process');
    }
}
