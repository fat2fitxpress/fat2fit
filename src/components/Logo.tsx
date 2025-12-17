import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Image from 'next/image';
import logoImg from '../assets/logo.png';

export default function Logo(props: BoxProps) {
    return (
        <Box
            {...props}
            component="span"
            sx={{
                width: '1em',
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
                height={500}
                unoptimized
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                }}
            />
        </Box>
    );
}
