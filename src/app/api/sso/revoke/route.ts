import { NextRequest, NextResponse } from 'next/server';
import { CLIENT_SECRET } from '@/lib/env';
import { ssoConfig } from '@/configs/sso';

export async function POST(req: NextRequest) {
    const clientSecret = req.headers.get('x-client-secret');

    if (clientSecret !== CLIENT_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Clear the user's session cookie
    const response = NextResponse.json({ message: 'Session revoked' }, { status: 200 });
    response.cookies.delete(ssoConfig.cookies.session.name);
    console.log('Revoked session');

    return response;
}
