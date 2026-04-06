import { CLIENT_NAME } from '@/lib/env';
import ssoClient from '@/lib/ssoClient';
import { publicRoutes } from '@/routes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (!code) {
        return redirect(publicRoutes.error + '?error=Authentication failed: Missing code parameter');
    }

    const clientId = process.env.CLIENT_ID!;

    try {
        const response = await ssoClient.post('/api/sso/token', { code, client_id: clientId });
        const cookieStore = await cookies();

        const token = response.data?.access_token;
        cookieStore.set(CLIENT_NAME + '.session-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return Response.redirect(next, 302);
    } catch (error) {
        console.error('SSO callback error:', error);
        return redirect(publicRoutes.error + '?error=Authentication failed: Unable to complete SSO process');
    }
}
