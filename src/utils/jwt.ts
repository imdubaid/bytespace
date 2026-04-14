import type { Session } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';

export function decodeJWT(token: string | undefined): Session | null {
    if (!token) return null;
    try {
        return jwtDecode(token) as Session;
    } catch {
        return null;
    }
}
