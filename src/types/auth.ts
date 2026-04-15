import { JwtPayload } from 'jwt-decode';

export interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
}

export interface Session extends JwtPayload {
    user?: User;
    expires: string;
    sid: string;
}
