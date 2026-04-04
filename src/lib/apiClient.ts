import axios from 'axios';

export async function getAuthClient() {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    const appSecret = process.env.CLIENT_SECRET!;
    headers.Authorization = `Bearer ${appSecret}`;

    return axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 10000,
        withCredentials: true,
        headers,
    });
}
