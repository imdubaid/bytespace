'use client';

import { Button, IconButton, Link, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { IoAddOutline, IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import type { ButtonProps } from '@mui/material';
import type { TypographyProps } from '@mui/material';

export const NewButton = () => {
    return (
        <Button
            variant='contained'
            shape='rounded'
            disableElevation
            sx={{
                maxWidth: 115,
                width: '100%',
                minHeight: 56,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',

                '&:hover': {
                    backgroundColor: 'action.hover',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
                },
            }}
            startIcon={<IoAddOutline />}>
            New
        </Button>
    );
}

export type BackButtonProps = PropsWithChildren<ButtonProps> & {
    iconButton?: boolean;
}

export const BackButton = (props: BackButtonProps) => {
    const { iconButton = false, ...rest } = props;
    const router = useRouter();

    if (iconButton) {
        return (
            <IconButton onClick={() => router.back()} {...rest}>
                <IoArrowBack size={24} />
            </IconButton>
        );
    }

    return (
        <Button variant='outlined' onClick={() => router.back()} startIcon={<IoArrowBack />} {...rest}>
            {props.children || 'Go back'}
        </Button>
    );
}

type LinkButtonProps = TypographyProps & {
    href?: string;
    title?: string;
}

export const LinkButton = (props: LinkButtonProps) => {
    const { href = '/', title = 'Back', ...rest } = props;

    return (
        <Link
            href={href}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                marginRight: 8,
                display: 'inline-flex',
                alignItems: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { textDecoration: 'underline' }, ...rest.sx }} {...rest}>
                ← {title}
            </Typography>
        </Link>
    )
}