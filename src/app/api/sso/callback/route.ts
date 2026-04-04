import { getAuthClient } from '@/lib/apiClient';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (!code) {
        throw new Error('Authentication failed: Missing code parameter');
    }

    const authClient = await getAuthClient();
    const clientId = process.env.CLIENT_ID!;

    try {
        const response = await authClient.post('/api/sso/exchange', { code, client_id: clientId });
        const cookieStore = await cookies();

        const token = response.data?.access_token;
        cookieStore.set('auth.session-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return Response.redirect(next, 302);
    } catch (error) {
        console.error('SSO callback error:', error);
        throw new Error('Authentication failed: Unable to complete SSO process');
    }
}
