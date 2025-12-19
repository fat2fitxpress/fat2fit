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

export default function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
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
                        Have questions or feedback? We'd love to hear from you.
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
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                fullWidth
                                                sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 8 }}
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
