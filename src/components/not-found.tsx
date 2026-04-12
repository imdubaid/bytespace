import { Box, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';
import { RiHomeLine } from 'react-icons/ri';
import { BackButton } from './button';

export type NotFoundProps = {
    title?: string;
    code?: number;
    error?: Error;
    reset?: () => void;
    description?: string;
    hideExtras?: boolean;
    hideCode?: boolean;
    customExtras?: ReactNode;
};

export function NotFound({ ...props }: NotFoundProps) {
    return (
        <Box
            component='main'
            sx={{
                display: 'grid',
                placeItems: 'center',
                minHeight: '100%',
                bgcolor: 'transparent',
                px: { xs: 3, sm: 4 },
                py: { xs: 12, sm: 16 },
            }}>
            <Box sx={{ textAlign: 'center' }}>
                {!props.hideCode && (
                    <Typography
                        variant='h3'
                        sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                        }}>
                        {props.code || '404'}
                    </Typography>
                )}

                <Typography
                    variant='h3'
                    component='h1'
                    sx={{
                        mt: 2,
                        fontWeight: 700,
                        fontSize: { xs: '1.875rem', sm: '3rem' },
                        color: 'text.primary',
                    }}>
                    {props.title || 'Page not found'}
                </Typography>

                <Typography
                    variant='body1'
                    sx={{
                        mt: 1.5,
                        lineHeight: 1.75,
                        color: 'text.secondary',
                    }}>
                    {props.description || "Sorry, we couldn't find the page you're looking for"}
                </Typography>

                {!props.hideExtras && (
                    <Stack direction='row' spacing={2} mt={4} alignItems='center' justifyContent='center'>
                        <BackButton variant='text' size='large' />

                        <Link href='/' style={{ textDecoration: 'none' }}>
                            <Button startIcon={<RiHomeLine />} variant='contained'>
                                Take me home
                            </Button>
                        </Link>
                    </Stack>
                )}

                {props.customExtras}
            </Box>
        </Box>
    );
}

export function PageNotFound(props: NotFoundProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                minHeight: '24rem',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <NotFound {...props} />
        </Box>
    );
}

export function UnAuthorized(props: NotFoundProps) {
    return <NotFound code={401} title='Unauthorized' {...props} />;
}

export function UnAuthorizedPage(props: NotFoundProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                minHeight: '24rem',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <UnAuthorized description='Sorry, you are not authorized to view this page' {...props} />
        </Box>
    );
}

export function ErrorPage(props: NotFoundProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                minHeight: '24rem',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <NotFound title='An Error Occurred' description='Sorry, something went wrong!' hideExtras hideCode {...props} />
        </Box>
    );
}

export function ComingSoon(props: NotFoundProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                minHeight: '24rem',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <NotFound
                title='Coming soon'
                description="🚧 We're working on something awesome! This page is coming soon. Stay tuned!"
                hideExtras
                hideCode
                {...props}
            />
        </Box>
    );
}
