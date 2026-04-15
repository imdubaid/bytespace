import { NextResponse } from 'next/server';
import { publicRoutes } from '@/routes';
import { getAbsolutePath } from '@/utils/helpers';
import { ssoConfig } from '@/configs/sso';

export function deleteCookies(res: NextResponse) {
    res.cookies.delete('sso_attempted');
    res.cookies.delete('sso_redirect_count');
}

export function error(message: string): NextResponse {
    const errorPage = getAbsolutePath(publicRoutes.error);

    const target = new URL(errorPage);
    target.searchParams.set('error', message);

    const response = NextResponse.redirect(target);
    deleteCookies(response);
    return response;
}

export function next(path?: string): NextResponse {
    const basePath = getAbsolutePath();

    const target = new URL(path ?? basePath);
    const response = NextResponse.redirect(target);
    deleteCookies(response);
    return response;
}

// Suggested function name: getSSOAuthorizationURL
export function getSSOAuthorizationURL(next?: string) {
    if (!next) {
        next = getAbsolutePath();
    }

    const authorize = new URL(ssoConfig.client.path.authorize, ssoConfig.client.host);
    authorize.searchParams.set('client_id', ssoConfig.app.id);
    authorize.searchParams.set('redirect_uri', ssoConfig.app.redirectURI);
    authorize.searchParams.set('next', next);

    return authorize;
}
