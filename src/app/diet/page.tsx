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
    title: 'Healthy Meal Plans, Fibermaxxing Recipes & Nutrition Guides 2026 | Fat2Fit',
    description: 'Science-backed meal plans and nutrition guides for 2026. Fibermaxxing recipes, GLP-1 friendly meals, microbiome-optimized diets, anti-inflammatory plans, and high-protein meal prep for sustainable fat loss, gut health, and metabolic flexibility.',
    keywords: [
        'meal plans 2026',
        'healthy recipes',
        'keto diet',
        'vegan meals',
        'mediterranean diet',
        'muscle building nutrition',
        'weight loss meals',
        'high protein meal plan',
        'meal prep for weight loss',
        'meal plan for busy professionals',
        // Gut Health & Microbiome (2026 trending)
        'fibermaxxing recipes',
        'microbiome personalization',
        'postbiotic supplements',
        'gut health recipes 2026',
        'kombucha gut-brain axis',
        'ultra-processed food UPF alternatives',
        'clean ingredient labels',
        // Metabolic & GLP-1
        'GLP-1 friendly diet ideas',
        'GLP-1 natural alternatives diet',
        'metabolic flexibility training diet',
        'metabolic health nutrition',
        'glucose-friendly meals',
        'continuous glucose monitor meal plan',
        // Specialized Nutrition
        'high protein desserts',
        'hormone balancing foods',
        'mitochondrial health diet',
        'anti-inflammatory meal plan',
        'nutrigenomics diet',
        'longevity diet plan',
        'visceral fat reduction diet',
        // Practical
        'personalized meal planning',
        'calorie deficit meal plan',
        'easy meal prep for fat loss',
        'sustainable diet for weight loss 2026',
    ],
    alternates: {
        canonical: '/diet',
    },
    openGraph: {
        title: 'Healthy Meal Plans, Fibermaxxing Recipes & Gut Health Nutrition 2026 | Fat2Fit',
        description: 'Explore science-backed meal plans for gut health, metabolic flexibility, and longevity. Fibermaxxing recipes, GLP-1 friendly meals, and microbiome-optimized diets.',
        url: 'https://fat2fitxpress.com/diet',
        type: 'website',
        siteName: 'Fat2Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Fat2Fit Diet Plans - Fibermaxxing, Gut Health & Longevity Nutrition 2026',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Meal Plans & Fibermaxxing Recipes 2026 | Fat2Fit',
        description: 'Science-backed meal plans for gut health, metabolic flexibility, and fat loss. Fibermaxxing recipes and GLP-1 friendly nutrition guides.',
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
                    height: { xs: 'auto', md: '70vh' },
                    minHeight: { xs: 400, md: '70vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    overflow: 'hidden',
                }}
            >
                <Image
                    src="/diet_hero_bg.png"
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
