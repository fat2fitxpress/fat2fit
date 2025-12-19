'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const SERVICE_ID = 'service_fat2fitxpress';
            const TEMPLATE_ID = 'template_vktaim6';
            const PUBLIC_KEY = 'k5thKtxmZQo4Cd-oF';

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: 'Fat2Fit Admin',
                },
                PUBLIC_KEY
            );

            setSnackbar({
                open: true,
                message: 'Thank you for your message! We will get back to you soon.',
                severity: 'success',
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Email sending failed:', error);
            setSnackbar({
                open: true,
                message: 'Failed to send message. Please try again later or email us directly.',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 12,
                    pb: 12,
                    borderBottom: 1,
                    borderColor: 'divider',
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h2"
                        color="text.primary"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                    >
                        Get In Touch
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                        Have questions or feedback? We&apos;d love to hear from you.
                    </Typography>
                </Container>
            </Box>

            {/* Contact Form Section */}
            <Container sx={{ py: 10 }} maxWidth="lg">
                <Grid container spacing={6}>
                    {/* Contact Information */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                            Contact Information
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <EmailIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body1">
                                        contact@fat2fitxpress.com
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>



                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOnIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Location
                                    </Typography>
                                    <Typography variant="body1">
                                        Online Worldwide
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Contact Form */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card elevation={0} variant="outlined">
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Send Us a Message
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Message"
                                                name="message"
                                                multiline
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Button
                                                disabled={loading}
                                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                                            >
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
