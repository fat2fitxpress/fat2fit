'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
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
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Fat2Fit
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your express journey to fitness.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                        <IconButton color="inherit" component={Link} href="https://facebook.com">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color="inherit" component={Link} href="https://twitter.com">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton color="inherit" component={Link} href="https://instagram.com">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton color="inherit" component={Link} href="https://linkedin.com">
                            <LinkedInIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Copyright />
                </Box>
            </Container>
        </Box>
    );
}
