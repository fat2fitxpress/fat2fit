'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalculateIcon from '@mui/icons-material/Calculate';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Link from 'next/link';
import TipsGrid from '@/components/TipsGrid';
import type { Post } from '@/lib/posts';

export default function LandingPage({ recentPosts }: { recentPosts: Post[] }) {
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
                        Your Express Journey to Fitness
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Personalized diet plans, workout routines, and expert tips to help you
                        achieve your health goals faster and smarter.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        href="/calculator"
                        sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 8 }}
                    >
                        Get Started
                    </Button>
                </Container>
            </Box>

            {/* Features Section */}
            <Container sx={{ py: 10 }} maxWidth="lg">
                <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
                    Everything You Need
                </Typography>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }} elevation={0} variant="outlined">
                            <CardActionArea component={Link} href="/workout-plan" sx={{ height: '100%', p: 2 }}>
                                <FitnessCenterIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Workout Plans
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Curated exercise routines tailored to your fitness level and goals.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }} elevation={0} variant="outlined">
                            <CardActionArea component={Link} href="/diet" sx={{ height: '100%', p: 2 }}>
                                <RestaurantMenuIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Diet & Nutrition
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Healthy meal plans and nutritional advice to fuel your body right.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }} elevation={0} variant="outlined">
                            <CardActionArea component={Link} href="/calculator" sx={{ height: '100%', p: 2 }}>
                                <CalculateIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        BMI Calculator
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Track your body mass index and stay on top of your health metrics.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }} elevation={0} variant="outlined">
                            <CardActionArea component={Link} href="/tips" sx={{ height: '100%', p: 2 }}>
                                <LightbulbIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Expert Tips
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Latest insights and articles to keep you motivated and informed.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Latest Tips Section */}
            <Box sx={{ bgcolor: 'action.hover', py: 10 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                            Latest from the Blog
                        </Typography>
                        <Button component={Link} href="/tips" variant="text" size="large">
                            View All
                        </Button>
                    </Box>
                    <TipsGrid posts={recentPosts} />
                </Container>
            </Box>

        </Box>
    );
}
