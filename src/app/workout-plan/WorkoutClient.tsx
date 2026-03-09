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

const categories: Array<WorkoutCategory | 'All'> = ['All', 'Strength', 'HIIT', 'Cardio', 'Core'];

export default function WorkoutClient({ plans }: WorkoutClientProps) {
    const [selectedCategory, setSelectedCategory] = React.useState<WorkoutCategory | 'All'>('All');

    const filteredPlans = selectedCategory === 'All'
        ? plans
        : plans.filter(plan => plan.category === selectedCategory);

    return (
        <Container id="workout-plans">
            <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
            >
                Find the right workout plan for your goal
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 6, maxWidth: 800, mx: 'auto', textAlign: 'center' }}
            >
                Explore strength, HIIT, cardio, and core training programs designed for fat loss, muscle building,
                and overall fitness. Filter by category to quickly discover the routine that matches your current
                level and goals.
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
        </Container>
    );
}
