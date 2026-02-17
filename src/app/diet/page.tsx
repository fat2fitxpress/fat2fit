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
    keywords: ['meal plans', 'nutrition guide', 'healthy recipes', 'diet plans', 'keto diet', 'vegan meals', 'mediterranean diet', 'muscle building nutrition', 'weight loss meals'],
    alternates: {
        canonical: '/diet',
    },
    openGraph: {
        title: 'Healthy Meal Plans & Nutrition | Fat2Fit',
        description: 'Explore nutritious meal plans tailored to your fitness goals. Keto, vegan, muscle-building, and balanced diets.',
        url: 'https://fat2fitxpress.com/diet',
        type: 'website',
    },
};

const dietSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Healthy Meal Plans',
    description: 'Collection of nutritious meal plans for various fitness goals',
    url: 'https://fat2fitxpress.com/diet',
};

export default function DietPage() {
    const diets = getAllDiets();

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
                <DietClient initialDiets={diets} />
            </Box>
        </Box>
    );
}
