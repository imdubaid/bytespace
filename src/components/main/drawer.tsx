'use client';

import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Drawer as MuiDrawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
} from '@mui/material';
import { routes } from './navList';

function Drawer() {
    const pathname = usePathname();
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('xm'));

    if (isMobile) return null;

    return (
        <Fragment>
            <MuiDrawer
                variant='permanent'
                sx={{
                    '& .MuiDrawer-paper': {
                        mt: 10,
                        backgroundColor: 'background.default',
                        width: '280px',
                        border: 'none',
                        boxShadow: 'none',
                        height: 'calc(100vh - 128px)',
                    },
                }}
                suppressHydrationWarning>
                <List sx={{ py: 2.5 }}>
                    {routes
                        .map((route) => {
                            const isActive =
                                route.link === '/' ? pathname === '/' : pathname.startsWith(route.link);

                            const style = {
                                '--nav-icon-bg': route.iconBgColor,
                                '--nav-icon-fg': route.iconColor,
                            } as CSSProperties;

                            return (
                                <ListItem key={route.link} disablePadding component={Link} href={route.link}>
                                    <ListItemButton
                                        variant='navItem'
                                        selected={isActive}
                                        style={style}
                                        component='div'
                                        suppressHydrationWarning>
                                        <ListItemIcon variant='navIcon'>
                                            <route.icon size={24} suppressHydrationWarning />
                                        </ListItemIcon>
                                        <ListItemText primary={route.name} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                </List>
            </MuiDrawer>
        </Fragment>
    );
}


export default Drawer;
