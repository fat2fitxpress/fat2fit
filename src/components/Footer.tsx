'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Logo from './Logo';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Fat2Fit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            component="footer"
            role="contentinfo"
            sx={{
                py: 6,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[900],
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={2} alignItems="center" justifyContent="center">
                    <Box>
                        <Logo sx={{ fontSize: 80 }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Your express journey to fitness.
                    </Typography>
                    <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            <Link href="/terms-of-service" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main', textDecoration: 'underline' } }}>
                                Terms of Service
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link href="/privacy-policy" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main', textDecoration: 'underline' } }}>
                                Privacy Policy
                            </Link>
                        </Typography>
                    </Stack>
                </Stack>
                <Box mt={3}>
                    <Copyright />
                </Box>
            </Container>
        </Box>
    );
}
