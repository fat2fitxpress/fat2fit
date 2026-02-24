import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Image from 'next/image';
import logoImg from '../assets/logo.webp';
import logoFallback from '../assets/logo_optimized.png';

export default function Logo(props: BoxProps) {
    // Logo aspect ratio: 1300x486 = ~2.67:1
    const aspectRatio = 1300 / 486;

    return (
        <Box
            {...props}
            component="span"
            sx={{
                width: `${aspectRatio}em`,
                height: '1em',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...props.sx,
            }}
        >
            <Image
                src={logoImg}
                alt="Fat2Fit Logo"
                width={500}
                height={187}
                priority
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                }}
            />
        </Box>
    );
}
