import axios from 'axios';
import { CLIENT_SECRET } from './env';

export default axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'x-client-secret': CLIENT_SECRET,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
});
