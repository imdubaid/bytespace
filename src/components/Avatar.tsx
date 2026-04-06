import React, { useMemo } from 'react';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { SxProps } from '@mui/material';
import { SimpleIconsCDN } from '@/lib/env';

interface AvatarProps extends MuiAvatarProps {
    name?: string;
    cdn?: string;
    src?: string;
    sx?: SxProps;
    alt?: string;
}

function Avatar(props: AvatarProps) {
    const { name, cdn, src, alt, ...rest } = props;

    const SRC = useMemo(() => {
        if (name) return `/images/${name}`;

        if (cdn) return SimpleIconsCDN + '/' + cdn;

        return src;
    }, [src, cdn, name]);

    const avatarAlt = alt || (name ? name.replace(/\.[^/.]+$/, '') : 'Avatar') || 'Avatar';

    return <MuiAvatar src={SRC} alt={avatarAlt} {...rest} />;
}

export default Avatar;
