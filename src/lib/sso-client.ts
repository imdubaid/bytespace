import axios from 'axios';
import { SSO_CLIENT } from './env';
import { ssoConfig } from '@/configs/sso';

export default axios.create({
    baseURL: SSO_CLIENT,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'x-client-secret': ssoConfig.app.secret,
    },
});
