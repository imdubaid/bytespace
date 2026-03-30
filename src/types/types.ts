import { permissionObjectTypes } from '@/types/constants';

export type ApiResponse<T> = { data: T; message: string; status: number; statusText: string };

export type PermissionObjectType = (typeof permissionObjectTypes)[number];

export type VerificationTemplate = {
    subject: string;
    appName: string;
    appIcon: string;
    type: string;
    message: string;
    buttonText: string;
    securityNote: string;
    userName: string;
    link: string;
    expire?: number;
};

export type SessionMap = {
    astate: {
        sub: string;
        name: string;
        email: string;
    };
    estate: {
        sub?: string;
        name?: string;
        email: string;
    };
};

export type SessionType = 'astate' | 'estate';
