import { NextRequest, NextResponse } from 'next/server';
import { CLIENT_NAME, CLIENT_SECRET } from '@/lib/env';
import { getAbsolutePath } from '@/utils/helpers';

export async function POST(req: NextRequest) {
    const clientSecret = req.headers.get('x-client-secret');

    if (clientSecret !== CLIENT_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Clear the user's session cookie
    const basePath = getAbsolutePath();
    const response = NextResponse.redirect(basePath);

    response.cookies.delete(CLIENT_NAME + '.session-token');
    response.cookies.delete(CLIENT_NAME + '.csrf-token');
    response.cookies.delete(CLIENT_NAME + '.callback-url');

    return response;
}
