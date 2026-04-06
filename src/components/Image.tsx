import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import React, { forwardRef } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    name?: string;
    src?: string;
    sx?: SxProps;
}

const Image = forwardRef(function Image(props: ImageProps, ref) {
    const { name, src, sx, ...rest } = props;

    const getSrc = () => {
        if (name) return `/images/${name}`;

        return src;
    };

    const imageAlt = rest.alt || (name ? name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') : 'Image') || 'Image';
    return <Box ref={ref} component='img' src={getSrc()} alt={imageAlt} draggable='false' sx={{ maxWidth: '100%', ...sx }} {...rest} />;
});

export default Image;
