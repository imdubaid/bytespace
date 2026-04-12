'use client';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

type SigningInLoaderProps = {
    startUrl: string;
};

/**
 * Full-page loader while the browser navigates to SSO start (sets cookies + IdP redirect).
 */
export function SigningInLoader({ startUrl }: SigningInLoaderProps) {

    useEffect(() => {
        window.location.assign(startUrl);
    }, [startUrl]);

    return (
        <Box
            sx={{
                minHeight: '100dvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
            }}>
            <Stack spacing={2} alignItems='center'>
                <CircularProgress size={40} />
                <Typography variant='body1' color='text.secondary'>
                    Redirecting to sign in…
                </Typography>
            </Stack>
        </Box>
    );
}
