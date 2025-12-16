'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function ComingSoon({ title }: { title: string }) {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center',
                }}
            >
                <ConstructionIcon sx={{ fontSize: 100, color: 'primary.main', mb: 4 }} />
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    We are working hard to bring you this feature.
                    <br />
                    Stay tuned!
                </Typography>
            </Box>
        </Container>
    );
}
