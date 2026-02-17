'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Logo from './Logo';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';

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
                <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ mb: 2 }}>
                            <Logo sx={{ fontSize: 80 }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            Your express journey to fitness.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                        <Box role="navigation" aria-label="Social media links">
                            <IconButton
                                color="inherit"
                                component={Link}
                                href="https://facebook.com"
                                aria-label="Visit our Facebook page"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component={Link}
                                href="https://twitter.com"
                                aria-label="Visit our Twitter profile"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component={Link}
                                href="https://instagram.com"
                                aria-label="Visit our Instagram profile"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <InstagramIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component={Link}
                                href="https://linkedin.com"
                                aria-label="Visit our LinkedIn page"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Copyright />
                </Box>
            </Container>
        </Box>
    );
}
