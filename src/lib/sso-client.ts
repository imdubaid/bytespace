import axios from 'axios';
import { CLIENT_SECRET, SSO_CLIENT } from './env';

export default axios.create({
    baseURL: SSO_CLIENT,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'x-client-secret': CLIENT_SECRET,
    },
});
