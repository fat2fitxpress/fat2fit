import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllDiets } from '@/lib/diets';
import DietClient from './DietClient';

export const metadata: Metadata = {
    title: 'Healthy Meal Plans & Nutrition Guides - Diet Recipes',
    description: 'Discover healthy meal plans and nutrition guides for weight loss, muscle building, and balanced eating. Keto, vegan, Mediterranean recipes and more.',
    keywords: [
        'meal plans',
        'nutrition guide',
        'healthy recipes',
        'diet plans',
        'keto diet',
        'vegan meals',
        'mediterranean diet',
        'muscle building nutrition',
        'weight loss meals',
        'high protein meal plan',
        'fat loss meal plan',
        'meal prep for weight loss',
        'meal plan for busy professionals',
        'glucose friendly diet',
        'GLP-1 friendly diet ideas',
    ],
    alternates: {
        canonical: '/diet',
    },
    openGraph: {
        title: 'Healthy Meal Plans & Nutrition | Fat2Fit',
        description: 'Explore nutritious meal plans tailored to your fitness goals. Keto, vegan, muscle-building, and balanced diets.',
        url: 'https://fat2fitxpress.com/diet',
        type: 'website',
        siteName: 'Fat2Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Fat2Fit Diet Plans',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Healthy Meal Plans & Nutrition | Fat2Fit',
        description: 'Explore nutritious meal plans tailored to your fitness goals. Keto, vegan, muscle-building, and balanced diets.',
        images: ['/og-image.png'],
    },
};

export default function DietPage() {
    const diets = getAllDiets();

    const dietSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Healthy Meal Plans & Nutrition Guides',
        description:
            'Collection of nutritious meal plans for weight loss, muscle building, vegan, and balanced eating, organized by goal and dietary preference.',
        url: 'https://fat2fitxpress.com/diet',
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: diets.map((diet, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://fat2fitxpress.com/diet/${diet.slug}`,
                name: diet.title,
                description: diet.description,
            })),
        },
    };

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
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000)',
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
                        Fuel Your Ambition
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                        Discover nutrition plans and healthy recipes tailored to your fitness journey.
                    </Typography>
                    <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 8 }} component="a" href="#diet-plans">
                        Explore Recipes
                    </Button>
                </Container>
            </Box>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(dietSchema) }}
            />

            <Box id="diet-plans">
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
                    >
                        Choose the best meal plan for your goal
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}
                    >
                        Explore weight-loss, muscle-building, vegan, and balanced diets with clear calories, prep time,
                        and categories so you can quickly find a plan that matches your lifestyle and fitness targets.
                    </Typography>
                </Container>

                <DietClient initialDiets={diets} />
            </Box>
        </Box>
    );
}
