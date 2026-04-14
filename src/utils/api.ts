import { NextResponse } from 'next/server';
import { decodeJWT } from './jwt';

export function withAuth(handler: (req: Request, user: any) => Promise<NextResponse>) {
    return async (req: Request) => {
        const token = req.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const user = decodeJWT(token);

        if (!user) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        return handler(req, user);
    };
}
