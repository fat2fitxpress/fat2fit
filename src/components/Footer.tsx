'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Logo from './Logo';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import VisitorCounter from './VisitorCounter';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Workout Plans', href: '/workout-plan' },
    { label: 'Diet Plans', href: '/diet' },
    { label: 'Tips & Blog', href: '/tips' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Contact', href: '/contact' },
];

const legalLinks = [
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
];

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
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Brand Column */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Stack spacing={1.5} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                            <Logo sx={{ fontSize: 80 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, textAlign: { xs: 'center', sm: 'left' } }}>
                                Your express journey to fitness. Science-backed workout plans, nutrition guides, and free tools.
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* Quick Links Column */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5, textAlign: { xs: 'center', sm: 'left' } }}>
                            Quick Links
                        </Typography>
                        <Stack spacing={1} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    color="text.secondary"
                                    sx={{
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Legal Column */}
                    <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5, textAlign: { xs: 'center', sm: 'left' } }}>
                            Legal
                        </Typography>
                        <Stack spacing={1} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    color="text.secondary"
                                    sx={{
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Copyright />
                <VisitorCounter />
            </Container>
        </Box>
    );
}
