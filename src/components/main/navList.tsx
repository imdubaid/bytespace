import { PermissionObjectType } from '@/types/types';
import { IconType } from 'react-icons';
import { GoHome } from 'react-icons/go';
import { PiIdentificationCard, PiShieldCheck } from 'react-icons/pi';
import { MdOutlinePassword } from 'react-icons/md';

export type RouteType = 'general' | 'security';

export type Route = {
    name: string;
    icon: IconType;
    link: string;
    description: string;
    hidden: boolean;
    iconBgColor: string;
    iconColor: string;
    type: RouteType;
    objectType?: PermissionObjectType;
};

export const routes: Route[] = [
    {
        name: 'Home',
        icon: GoHome,
        link: '/',
        description: 'Overview of your account and recent activity',
        hidden: false,
        iconBgColor: '#D2E3FC',
        iconColor: '#1A73E8',
        type: 'general',
    },
    {
        name: 'My space',
        icon: PiIdentificationCard,
        link: '/my-space',
        description: 'Drive and storage management',
        hidden: false,
        iconBgColor: '#CEEAD6',
        iconColor: '#137333',
        type: 'general',
    },
    {
        name: 'Shared',
        icon: PiShieldCheck,
        link: '/shared',
        description: 'Manage your shared files and folders',
        hidden: false,
        iconBgColor: '#7fcfff',
        iconColor: '#02034d',
        type: 'security',
    },
    {
        name: 'Favorites',
        icon: MdOutlinePassword,
        link: '/favorites',
        description: 'Manage your favorite files and folders',
        hidden: false,
        iconBgColor: '#7fcfff',
        iconColor: '#02034d',
        type: 'security',
    },
].filter(route => !route.hidden) as Route[];

export const classifiedRoutes = routes.reduce(
    (acc, route) => {
        acc[route.type].push(route);
        return acc;
    },
    { general: [], security: [] } as Record<RouteType, Route[]>,
);
