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
import { useTheme } from '@mui/material/styles';
import TimerIcon from '@mui/icons-material/Timer';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Link from 'next/link';
import Image from 'next/image';

export type WorkoutLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type WorkoutCategory = 'Strength' | 'HIIT' | 'Cardio' | 'Core';

export interface WorkoutPlan {
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

interface WorkoutClientProps {
    plans: WorkoutPlan[];
}

const categories: Array<WorkoutCategory | 'All'> = ['Strength', 'HIIT', 'Cardio', 'Core', 'All'];

export default function WorkoutClient({ plans }: WorkoutClientProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [selectedCategory, setSelectedCategory] = React.useState<WorkoutCategory | 'All'>('All');

    const filteredPlans = selectedCategory === 'All'
        ? plans
        : plans.filter(plan => plan.category === selectedCategory);

    return (
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
            {/* Plans Section */}
            <Box id="workout-plans" sx={{ bgcolor: 'action.hover', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            mb: 6,
                            textAlign: 'center',
                            color: isDarkMode ? 'inherit' : '#000000'
                        }}
                    >
                        Find the right workout plan for your goal
                    </Typography>

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
                                    <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
                                        <Image
                                            src={plan.image}
                                            alt={plan.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            quality={75}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Box>
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

                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, mb: 1 }}>
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
                                            sx={{
                                                borderRadius: 4,
                                                fontWeight: 600,
                                                textTransform: 'none'
                                            }}
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
                </Container>
            </Box>

            {/* Training Tips Section */}
            <Container sx={{ py: 8 }}>
                <Box
                    sx={{
                        p: { xs: 3, md: 6 },
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                    component="section"
                    aria-label="Expert training tips"
                >
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800"
                                alt="Athlete performing a strength training exercise"
                                sx={{ width: '100%', borderRadius: 4, boxShadow: 3 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                                Expert Advice
                            </Typography>
                            <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    color: isDarkMode ? 'inherit' : '#000000'
                                }}
                            >
                                Training Tip of the Day
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
                                Consistency is key. It&apos;s not about being perfect, it&apos;s about being better than you were yesterday. Start small, stay committed, and you&apos;ll see the results you desire.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
                                Focus on progressive overload — gradually increase weight, reps, or sets to keep challenging your muscles and driving growth.
                            </Typography>
                            <Link href="/tips" style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        mt: 2,
                                        borderRadius: 4,
                                        px: 4,
                                        py: 1.25,
                                        fontSize: '1rem',
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Read More Tips
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
