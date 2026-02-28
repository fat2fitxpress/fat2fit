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
import { useTheme } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalculateIcon from '@mui/icons-material/Calculate';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AndroidIcon from '@mui/icons-material/Android';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import Image from 'next/image';
import TipsGrid from '@/components/TipsGrid';
import type { Post } from '@/lib/posts';

export default function LandingPage({ recentPosts }: { recentPosts: Post[] }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >

            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    pt: 12,
                    pb: 12,
                    textAlign: 'center',
                    minHeight: '400px',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(11, 18, 33, 0.85) 0%, rgba(66, 133, 244, 0.3) 50%, rgba(155, 114, 203, 0.3) 100%)',
                        zIndex: 1,
                    },
                }}
            >
                <Image
                    src="/fitness_hero_background.webp"
                    alt="Fitness Background"
                    fill
                    priority
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                        zIndex: 0,
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: '#ffffff',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}
                    >
                        Your Express Journey to Fitness
                    </Typography>
                    <Typography
                        variant="h5"
                        paragraph
                        sx={{
                            mb: 4,
                            color: 'rgba(255, 255, 255, 0.95)',
                            textShadow: '0 1px 5px rgba(0,0,0,0.2)',
                        }}
                    >
                        Personalized diet plans, workout routines, and expert tips to help you
                        achieve your health goals faster and smarter.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        href="/calculator"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            borderRadius: 8,
                            background: 'linear-gradient(45deg, #4285f4, #669df6)',
                            boxShadow: '0 4px 20px rgba(66, 133, 244, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #669df6, #8ab4f8)',
                                boxShadow: '0 6px 25px rgba(66, 133, 244, 0.6)',
                            },
                        }}
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
                                        BMR Calculator
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Calculate your basal metabolic rate to understand your daily calorie needs.
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

            {/* Android App Promotion Section */}
            <Box
                sx={{
                    py: { xs: 8, md: 10 },
                    background: isDarkMode
                        ? 'linear-gradient(135deg, #131b2f 0%, #0b1221 100%)'
                        : 'linear-gradient(135deg, #f8faff 0%, #e8f0fe 100%)',
                    overflow: 'hidden',
                    borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 2, py: 0.5, borderRadius: 5, bgcolor: 'primary.main', color: 'white', mb: 3 }}>
                                <AndroidIcon sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>
                                    Coming Soon
                                </Typography>
                            </Box>
                            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                Get Fat2Fit on Your Android Device
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', fontWeight: 'normal', lineHeight: 1.6 }}>
                                We're hard at work building the ultimate fitness companion for your mobile. Take your workout plans and nutrition tracking wherever you go.
                            </Typography>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <CheckCircleOutlineIcon color="primary" sx={{ mr: 1.5 }} />
                                    <Typography variant="body1">Offline access to workout routines</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <CheckCircleOutlineIcon color="primary" sx={{ mr: 1.5 }} />
                                    <Typography variant="body1">Real-time calorie & macro tracking</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleOutlineIcon color="primary" sx={{ mr: 1.5 }} />
                                    <Typography variant="body1">Personalized daily notifications</Typography>
                                </Box>
                            </Box>

                            <Button
                                variant="outlined"
                                size="large"
                                disabled
                                sx={{
                                    borderRadius: 2,
                                    borderWidth: 2,
                                    '&.Mui-disabled': {
                                        borderWidth: 2,
                                        color: 'text.secondary',
                                        borderColor: 'divider'
                                    }
                                }}
                            >
                                Google Play Store (Coming Soon)
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: { xs: 300, md: 500 },
                                    width: '100%',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    boxShadow: isDarkMode
                                        ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(66, 133, 244, 0.1)'
                                        : '0 20px 40px rgba(0,0,0,0.1)',
                                    transform: { md: 'perspective(1000px) rotateY(-5deg)' },
                                    transition: 'transform 0.5s ease-in-out',
                                    '&:hover': {
                                        transform: { md: 'perspective(1000px) rotateY(0deg)' }
                                    }
                                }}
                            >
                                <Image
                                    src="/android_app_promo.png"
                                    alt="Fat2Fit Android App Preview"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

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
