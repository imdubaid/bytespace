import { SSO_CLIENT } from './lib/env';

export const publicRoutes = {
    error: '/error',
    signIn: '/sign-in',
    signOut: '/sign-out',
    ssoCallback: '/api/sso/callback',
};

export const authRoutes = {
    auth: `${SSO_CLIENT}/api/sso/authorize`,
};

export const DEFAULT_ROUTE = '/';

export const routes = {
    home: '/',
};
