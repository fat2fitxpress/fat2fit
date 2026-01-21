'use client';

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

import Link from 'next/link';

type WorkoutLevel = 'Beginner' | 'Intermediate' | 'Advanced';
type WorkoutCategory = 'Strength' | 'HIIT' | 'Cardio' | 'Core';

interface WorkoutPlan {
    slug: string;
    title: string;
    description: string;
    image: string;
    duration: string;
    level: WorkoutLevel;
    calories: string;
    category: WorkoutCategory;
    exercises: string[];
}

const workoutPlans: WorkoutPlan[] = [
    // Strength Category
    {
        slug: 'strength-foundation',
        title: 'Strength Foundation',
        description: 'Build a solid base with fundamental compound movements. Perfect for newcomers to strength training.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
        duration: '40 mins',
        level: 'Beginner',
        calories: '250-350',
        category: 'Strength',
        exercises: ['Bodyweight Squats', 'Push-ups', 'Dumbbell Rows', 'Planks'],
    },
    {
        slug: 'power-builder',
        title: 'Power Builder',
        description: 'Intermediate strength program focusing on progressive overload and muscle development.',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200',
        duration: '50 mins',
        level: 'Intermediate',
        calories: '350-450',
        category: 'Strength',
        exercises: ['Barbell Squats', 'Bench Press', 'Deadlifts', 'Pull-ups'],
    },
    {
        slug: 'strength-master',
        title: 'Strength Master',
        description: 'Advanced powerlifting-focused program for maximum strength gains and new PRs.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200',
        duration: '60 mins',
        level: 'Advanced',
        calories: '400-550',
        category: 'Strength',
        exercises: ['Heavy Squats', 'Heavy Bench', 'Heavy Deadlifts', 'Weighted Pull-ups'],
    },

    // HIIT Category
    {
        slug: 'hiit-starter',
        title: 'HIIT Starter',
        description: 'Introduction to high-intensity interval training with manageable work-to-rest ratios.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
        duration: '25 mins',
        level: 'Beginner',
        calories: '250-350',
        category: 'HIIT',
        exercises: ['Jumping Jacks', 'Mountain Climbers', 'Burpees', 'High Knees'],
    },
    {
        slug: 'full-body-shred',
        title: 'Full Body Shred',
        description: 'Intense circuit training to burn fat and build lean muscle across your entire body.',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200',
        duration: '35 mins',
        level: 'Intermediate',
        calories: '400-550',
        category: 'HIIT',
        exercises: ['Box Jumps', 'Kettlebell Swings', 'Battle Ropes', 'Sprints'],
    },
    {
        slug: 'extreme-hiit',
        title: 'Extreme HIIT',
        description: 'Maximum intensity intervals for elite fitness and rapid fat loss. Push your limits.',
        image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200',
        duration: '45 mins',
        level: 'Advanced',
        calories: '600-800',
        category: 'HIIT',
        exercises: ['Plyometric Jumps', 'Heavy Bag Work', 'Sled Pushes', 'Tabata Sprints'],
    },

    // Cardio Category
    {
        slug: 'cardio-kickstart',
        title: 'Cardio Kickstart',
        description: 'Build your cardiovascular base with moderate-intensity steady-state training.',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200',
        duration: '30 mins',
        level: 'Beginner',
        calories: '200-300',
        category: 'Cardio',
        exercises: ['Brisk Walking', 'Light Jogging', 'Cycling', 'Elliptical'],
    },
    {
        slug: 'endurance-runner',
        title: 'Endurance Runner',
        description: 'Progressive cardio program to improve stamina and cardiovascular health.',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200',
        duration: '45 mins',
        level: 'Intermediate',
        calories: '450-600',
        category: 'Cardio',
        exercises: ['Running Intervals', 'Tempo Runs', 'Hill Sprints', 'Long Runs'],
    },
    {
        slug: 'cardio-elite',
        title: 'Cardio Elite',
        description: 'Advanced endurance training for peak cardiovascular performance and stamina.',
        image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1200',
        duration: '60 mins',
        level: 'Advanced',
        calories: '600-800',
        category: 'Cardio',
        exercises: ['Long Distance Runs', 'Fartlek Training', 'Marathon Pace', 'Speed Work'],
    },

    // Core Category
    {
        slug: 'core-foundation',
        title: 'Core Foundation',
        description: 'Build stability and core strength with fundamental exercises for beginners.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200',
        duration: '20 mins',
        level: 'Beginner',
        calories: '150-250',
        category: 'Core',
        exercises: ['Planks', 'Dead Bugs', 'Bird Dogs', 'Glute Bridges'],
    },
    {
        slug: 'core-sculptor',
        title: 'Core Sculptor',
        description: 'Intermediate core workout combining stability and dynamic movements for definition.',
        image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200',
        duration: '30 mins',
        level: 'Intermediate',
        calories: '250-350',
        category: 'Core',
        exercises: ['Russian Twists', 'Leg Raises', 'Mountain Climbers', 'Bicycle Crunches'],
    },
    {
        slug: 'core-dominator',
        title: 'Core Dominator',
        description: 'Advanced core training with challenging exercises for maximum strength and definition.',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200',
        duration: '40 mins',
        level: 'Advanced',
        calories: '350-450',
        category: 'Core',
        exercises: ['Dragon Flags', 'Ab Wheel Rollouts', 'Hanging Leg Raises', 'Weighted Planks'],
    },
];

export default function WorkoutPage() {
    const [selectedCategory, setSelectedCategory] = React.useState<WorkoutCategory | 'All'>('All');

    const filteredPlans = selectedCategory === 'All'
        ? workoutPlans
        : workoutPlans.filter(plan => plan.category === selectedCategory);

    const categories: Array<WorkoutCategory | 'All'> = ['All', 'Strength', 'HIIT', 'Cardio', 'Core'];

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
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6, flexWrap: 'wrap', gap: 2 }}>
                    {categories.map((category) => (
                        <Chip
                            key={category}
                            label={category === 'All' ? 'All Plans' : category}
                            color={selectedCategory === category ? 'primary' : 'default'}
                            variant={selectedCategory === category ? 'filled' : 'outlined'}
                            onClick={() => setSelectedCategory(category)}
                            sx={{
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                }
                            }}
                        />
                    ))}
                </Stack>

                <Grid container spacing={4}>
                    {filteredPlans.map((plan, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
                                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                        <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                                            {plan.category}
                                        </Typography>
                                        <Typography variant="overline" color="text.secondary">
                                            • {plan.level}
                                        </Typography>
                                    </Stack>
                                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                        {plan.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {plan.description}
                                    </Typography>

                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <TimerIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="caption" color="text.secondary">
                                                {plan.duration}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <WhatshotIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="caption" color="text.secondary">
                                                {plan.calories} kcal
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                                        Sample exercises:
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {plan.exercises.join(' • ')}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{ borderRadius: 4 }}
                                        component={Link}
                                        href={`/workout-plan/${plan.slug}`}
                                    >
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
