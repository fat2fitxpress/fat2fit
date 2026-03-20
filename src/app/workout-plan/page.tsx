import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import WorkoutClient, { WorkoutPlan } from './WorkoutClient';

export const metadata: Metadata = {
    title: 'Workout Plans - Strength, HIIT, Cardio & Reverse Running | Fat2Fit',
    description: 'Scientifically-designed workout plans for weight loss, muscle building, and longevity. Strength training, HIIT, reverse running, and functional programs for busy professionals.',
    keywords: [
        'workout plans',
        'functional training routines',
        'longevity workouts',
        'low-impact cardio',
        'somatic movement exercises',
        'breathwork for recovery',
        'metabolic conditioning',
        'biohacking fitness',
        'micro-workouts for busy people',
        'neuro-adaptive training',
        'strength training for longevity',
        'somatic movement protocols',
        'low-impact functional fitness',
        'reverse running benefits',
        'reverse running workout plan',
        'progressive overload for women',
        'women strength training program',
        'best weight loss workout plan',
        'workout plan for busy professionals',
        'beginner strength training program',
    ],
    alternates: {
        canonical: '/workout-plan',
    },
    openGraph: {
        title: 'Workout Plans - Strength, HIIT, Cardio & Core | Fat2Fit',
        description: 'Professionally designed workout plans for fat loss, muscle building, and peak fitness.',
        url: 'https://fat2fitxpress.com/workout-plan',
        type: 'website',
        siteName: 'Fat2Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Fat2Fit Workout Plans',
            },
        ],
    },
};

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

const workoutListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Workout Plans - Strength, HIIT, Cardio & Core Training',
    description:
        'Browse professionally designed workout plans for all fitness levels. Choose from strength, HIIT, cardio, and core training programs for fat loss, muscle building, and overall fitness.',
    url: 'https://fat2fitxpress.com/workout-plan',
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: workoutPlans.map((plan, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://fat2fitxpress.com/workout-plan/${plan.slug}`,
            name: plan.title,
            description: plan.description,
        })),
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://fat2fitxpress.com',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Workout Plans',
            item: 'https://fat2fitxpress.com/workout-plan',
        },
    ],
};

export default function WorkoutPage() {
    return (
        <Box sx={{ bgcolor: 'background.default' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(workoutListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: 'auto', md: 300 },
                    minHeight: { xs: 350, md: 300 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    overflow: 'hidden',
                    py: { xs: 8, md: 0 },
                }}
            >
                {/* Optimized background image */}
                <Image
                    src="/workout_hero_bg.webp"
                    alt="Transformation journey through professional workout plans"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    quality={85}
                    style={{
                        objectFit: 'cover',
                        zIndex: 0,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        zIndex: 1,
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }} component="section" aria-label="Workout transformation hero">
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                            lineHeight: 1.2,
                        }}
                    >
                        Transform Your Body
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                        Choose from our professionally designed workout plans to achieve your fitness goals faster.
                    </Typography>
                </Container>
            </Box>

            <WorkoutClient plans={workoutPlans} />
        </Box>
    );
}
