import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Providers from '@/providers';
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
        <html lang='en' className='h-full antialiased'>
            <body>
                <AppRouterCacheProvider>
                    <Providers>{children}</Providers>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
