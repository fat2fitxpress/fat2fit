import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDiets } from '@/lib/diets';
import DietClient from './DietClient';

export const metadata: Metadata = {
    title: 'Healthy Meal Plans & Nutrition Guides for Weight Loss | Fat2Fit',
    description: 'Science-backed meal plans and nutrition guides for sustainable weight loss and muscle building. Anti-inflammatory recipes, gut health optimization, keto, vegan, and high-protein diets for busy professionals.',
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
        'nutrigenomics diet',
        'anti-inflammatory meal plan',
        'gut health recipes',
        'microbiome optimization',
        'glucose-friendly meals',
        'GLP-1 friendly diet ideas',
        'metabolic health nutrition',
        'personalized meal planning',
        'best weight loss diet for busy professionals',
        'calorie deficit meal plan',
        'protein meal plan for weight loss',
        'easy meal prep for fat loss',
        'sustainable diet for weight loss 2026',
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
        site: '@fat2fit',
        creator: '@fat2fit',
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
            name: 'Diet Plans',
            item: 'https://fat2fitxpress.com/diet',
        },
    ],
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
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    overflow: 'hidden',
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000&auto=format"
                    alt="Healthy Diet Background"
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
                        bgcolor: 'rgba(0,0,0,0.5)',
                        zIndex: 1,
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                        Fuel Your Ambition
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, color: 'rgba(255,255,255,0.9)' }}>
                        Discover nutrition plans and healthy recipes tailored to your fitness journey.
                    </Typography>
                    <Link href="#diet-plans" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 4 }}>
                            Explore Recipes
                        </Button>
                    </Link>
                </Container>
            </Box>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(dietSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Plans Section */}
            <Box id="diet-plans" sx={{ bgcolor: 'action.hover', py: 8 }}>
                <Container maxWidth="lg">
                    <DietClient initialDiets={diets} />
                </Container>
            </Box>
        </Box>
    );
}
