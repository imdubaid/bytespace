import type { Metadata } from 'next';
import Header from '@/components/main/header';
import Drawer from '@/components/main/drawer';
import { DrawerWidth } from '@/constants/elements';
import Stack from '@mui/material/Stack';
import '@/styles/globals.css';
import '@/styles/googleSans.css';

export const metadata: Metadata = {
    title: 'ByteSpace',
    description: 'A modern, responsive, and user-friendly file manager built with Next.js and Material UI.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Stack>
            <Header />
            <Stack
                sx={{
                    width: { xs: '100%', xm: `calc(100% - ${DrawerWidth}px)` },
                    marginLeft: { xs: 0, xm: `${DrawerWidth}px` },
                    height: `calc(100vh - 64px)`,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}>
                <Drawer />

                {children}
            </Stack>
        </Stack>
    );
}
