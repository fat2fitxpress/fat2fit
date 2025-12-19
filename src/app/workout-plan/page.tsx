import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Workout Plans - Fat2Fit',
    description: 'Explore our curated workout plans designed for all fitness levels.',
};

const workoutPlans = [
    {
        title: 'Full Body Shred',
        description: 'A high-intensity circuit training plan designed to burn fat and build lean muscle across your entire body.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
        duration: '45 mins',
        level: 'Intermediate',
        calories: '400-600',
        category: 'HIIT',
    },
    {
        title: 'Strength Master',
        description: 'Focus on compound movements to maximize strength gains. Perfect for those looking to hit new PRs.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
        duration: '60 mins',
        level: 'Advanced',
        calories: '300-500',
        category: 'Strength',
    },
    {
        title: 'Beginner Core Flow',
        description: 'Build a solid foundation with this low-impact core and stability workout. Ideal for fitness newcomers.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200',
        duration: '30 mins',
        level: 'Beginner',
        calories: '200-300',
        category: 'Core',
    },
    {
        title: 'Endurance Runner',
        description: 'Improve your cardiovascular health and stamina with this progressive running and cardio program.',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200',
        duration: '50 mins',
        level: 'Intermediate',
        calories: '500-700',
        category: 'Cardio',
    },
];

export default function WorkoutPage() {
    return (
        <Box sx={{ bgcolor: 'background.default', pb: 10 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    mb: 8,
                    overflow: 'hidden',
                }}
            >
                {/* Overlay with generated image */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(/C:/Users/kavis/.gemini/antigravity/brain/f31b8a4a-aba8-4f2c-864b-f67c47185a45/workout_hero_bg_1766119923339.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: 'rgba(0,0,0,0.6)',
                        },
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Transform Your Body
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                        Choose from our professionally designed workout plans to achieve your fitness goals faster.
                    </Typography>
                    <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 8 }}>
                        Get Started
                    </Button>
                </Container>
            </Box>

            <Container>
                {/* Category Filter Chips */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6 }}>
                    <Chip label="All Plans" color="primary" />
                    <Chip label="Strength" variant="outlined" />
                    <Chip label="HIIT" variant="outlined" />
                    <Chip label="Cardio" variant="outlined" />
                    <Chip label="Core" variant="outlined" />
                </Stack>

                <Grid container spacing={4}>
                    {workoutPlans.map((plan, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 4,
                                    bgcolor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0px 10px 20px rgba(0,0,0,0.15)',
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={plan.image}
                                    alt={plan.title}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                                        {plan.category}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                        {plan.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {plan.description}
                                    </Typography>

                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                        <TimerIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {plan.duration}
                                        </Typography>
                                        <FitnessCenterIcon sx={{ fontSize: 18, color: 'text.secondary', ml: 1 }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {plan.level}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <WhatshotIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {plan.calories} kcal
                                        </Typography>
                                    </Stack>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                    <Button fullWidth variant="outlined" sx={{ borderRadius: 4 }}>
                                        View Plan
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Training Tips Section */}
                <Box sx={{ mt: 10, p: 4, bgcolor: 'primary.main', borderRadius: 4, color: 'white' }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Training Tip of the Day
                            </Typography>
                            <Typography variant="body1">
                                "Consistency is key. It's not about being perfect, it's about being better than you were yesterday. Start small, stay committed, and you'll see the results you desire."
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'right' }}>
                            <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f0f0f0' } }}>
                                Read More Tips
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
