import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import Image from './Image';
import Link, { LinkProps } from 'next/link';
import { SxProps } from '@mui/material';
import { IconType } from 'react-icons/lib';

interface ActionIconProps {
    Icon?: IconType;
    name?: string;
    href: LinkProps['href'] | '#';
    title?: string;
    imageSx?: React.CSSProperties;
    sx?: SxProps;
    fontSize?: string | number;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

export default function ActionIcon(props: ActionIconProps) {
    const { Icon, name, href, title, imageSx, fontSize, sx, placement = 'bottom', ...rest } = props;

    return (
        <Tooltip
            title={title}
            placement={placement}
            slotProps={{
                tooltip: {
                    sx: {
                        bgcolor: 'common.black',
                        '& .MuiTooltip-arrow': {
                            color: 'common.black',
                        },
                    },
                },
            }}>
            <Link href={href} target='_blank'>
                <IconButton sx={sx} {...rest}>
                    {Icon ? (
                        <Icon fontSize={fontSize} />
                    ) : (
                        <Image
                            name={name}
                            alt={name}
                            sx={{
                                maxHeight: '30px',
                                ...imageSx,
                            }}
                            {...rest}
                        />
                    )}
                </IconButton>
            </Link>
        </Tooltip>
    );
}
