export const HTTP_STATUS_MESSAGES: Record<number, string> = {
    400: 'Please check your input and try again.',
    401: 'Unauthorized. Please sign in and try again.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'There is a conflict with the current state of the resource.',
    500: 'Internal server error. Please try again later.',
    501: 'This feature is not supported by the server.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service unavailable. Please try again later.',
    504: 'The server took too long to respond.',
};

export const AUTH_ERROR_MESSAGES = {
    CredentialsSignin: 'Invalid credentials!',
    JWTSessionError: 'Your session could not be verified. Please sign in again.',
    CallbackRouteError: 'An error occurred while trying to redirect. Please try again.',
    AccessDenied: 'Access to this resource is denied. You may not have the necessary permissions.',
    Verification: 'Verification error. The verification link is invalid or has expired.',
    Configuration: 'There is a problem with the server configuration. Please contact support if this problem persists.',
    AuthenticationError: 'An error occurred during authentication. Please try again.',
    OAuthAccountNotLinked: 'This email is already linked to another sign-in method.',
    OAuthSignin: 'Could not start sign-in process at the moment.',
    OAuthCallback: 'Sign in failed.',
    Callback: 'Authentication failed due to an internal error.',
    OAuthCreateAccount: 'User account could not be created.',
    EmailCreateAccount: 'Email provider failed to create account.',
    SomethingWentWrong: 'Something went wrong. Please try again later.',
    Default: 'Something went wrong during authentication. Please try again later.',
};

export type AuthErrors = keyof typeof AUTH_ERROR_MESSAGES;
