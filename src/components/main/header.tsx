'use client';

import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Drawer from '@/components/main/drawer';
import { Avatar, Menu, Stack } from '@mui/material';
import useMenu from '@/hooks/useMenu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar
                position='sticky'
                elevation={0}
                color='transparent'
                sx={{ zIndex: theme => theme.zIndex.drawer + 1, height: 64 }}
                component='header'
                suppressHydrationWarning>
                <Toolbar sx={{ '&': { px: 1, py: 1 } }}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                        <Image src='/images/logo-name.png' alt='logo' width={180} height={48} suppressHydrationWarning />
                        <Actions />
                    </Stack>
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
}

function Actions() {
    const { anchorEl, openMenu, closeMenu } = useMenu();
    // const { data: session } = useSession();

    return (
        <Stack direction='row' spacing={3} px={0.5}>
            <Avatar
                onClick={openMenu}
                sx={{
                    width: 35,
                    height: 35,
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)',
                }}
                // src={session?.user?.image ?? undefined}
                slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
            />

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </Stack>
    );
}
