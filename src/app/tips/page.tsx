import { getAllPosts } from '@/lib/posts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TipsGrid from '@/components/TipsGrid';
import Image from 'next/image';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Fitness Blog 2026: Expert Health Advice & Science-Backed Guides',
    description: 'Explore the award-winning Fat 2 Fit fitness blog. Get expert health advice, science-backed workout guides, and the most comprehensive nutrition tips. Your ultimate resource for muscle building, HIIT, and longevity.',
    keywords: [
        'best fitness blog 2026',
        'top health advice',
        'expert fitness blog',
        'science-backed health guides',
        'professional workout advice',
        'muscle building tips',
        'HIIT benefits',
        'workout recovery strategies',
        'nutrition timing guide',
        'health blog for transformation',
        'fitness articles 2026',
        'award winning fitness blog',
        'strength training research',
        'weight loss guides',
        'longevity fitness tips',
    ],
    alternates: {
        canonical: '/tips',
    },
    openGraph: {
        title: 'Best Fitness Blog 2026: Expert Health Advice | Fat 2 Fit',
        description: 'Award-winning fitness insights on muscle building, HIIT training, nutrition timing, and longevity. The most comprehensive health blog for your transformation journey.',
        url: 'https://fat2fitxpress.com/tips',
        type: 'website',
        siteName: 'Fat 2 Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Fat 2 Fit - Best Fitness Blog 2026',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Fitness Blog 2026: Expert Health Advice | Fat 2 Fit',
        description: 'Free expert fitness tips, workout guides, and science-backed nutrition advice from the Best Fitness Blog of 2026.',
        images: ['/og-image.png'],
        site: '@fat2fit',
        creator: '@fat2fit',
    },
};

const tipsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Fitness Blog 2026: Expert Health Advice & Guides',
    description: 'An award-winning collection of expert fitness tips, science-backed workout guides, and comprehensive nutrition strategies for your transformation journey.',
    url: 'https://fat2fitxpress.com/tips',
    about: {
        '@type': 'Thing',
        name: 'Fitness and Health'
    },
    publisher: {
        '@type': 'Organization',
        name: 'Fat 2 Fit',
        url: 'https://fat2fitxpress.com',
        logo: {
            '@type': 'ImageObject',
            url: 'https://fat2fitxpress.com/logo.png',
        },
    },
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
            {
                '@type': 'Article',
                position: 1,
                name: 'Muscle Building Guide',
                url: 'https://fat2fitxpress.com/tips/muscle-building-guide',
            },
            {
                '@type': 'Article',
                position: 2,
                name: 'HIIT Workout Benefits',
                url: 'https://fat2fitxpress.com/tips/hiit-workout-benefits',
            },
            {
                '@type': 'Article',
                position: 3,
                name: 'Nutrition Timing Guide',
                url: 'https://fat2fitxpress.com/tips/nutrition-timing-guide',
            },
            {
                '@type': 'Article',
                position: 4,
                name: 'Recovery and Rest Importance',
                url: 'https://fat2fitxpress.com/tips/recovery-rest-importance',
            },
            {
                '@type': 'Article',
                position: 5,
                name: 'Common Workout Mistakes',
                url: 'https://fat2fitxpress.com/tips/common-workout-mistakes',
            },
            {
                '@type': 'Article',
                position: 6,
                name: 'Fitness Tracking Wearable Technology',
                url: 'https://fat2fitxpress.com/tips/fitness-tracking-wearable-technology',
            },
        ],
    },
    breadcrumb: {
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
                name: 'Fitness Blog',
                item: 'https://fat2fitxpress.com/tips',
            },
        ],
    },
};

export default function TipsPage() {
    const posts = getAllPosts();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            {/* Hero Section with Background Image */}
            <Box
                sx={{
                    position: 'relative',
                    height: 320,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    mb: 8,
                    overflow: 'hidden',
                }}
            >
                <Image
                    src="/tips_hero_bg.jpg"
                    alt="Fitness tips background"
                    fill
                    priority
                    sizes="100vw"
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
                        bgcolor: 'rgba(0,0,0,0.55)',
                        zIndex: 1,
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 'bold', mb: 2, color: '#ffffff' }}
                    >
                        Fitness Tips & Expert Health Advice
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            maxWidth: '800px',
                            mx: 'auto',
                            color: 'rgba(255,255,255,0.9)',
                        }}
                    >
                        Science-backed fitness guides, workout strategies, and nutrition tips to help you build muscle, lose fat, and achieve your health goals faster.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 8 }}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(tipsSchema) }}
                />
                <TipsGrid posts={posts} />
            </Container>
        </Box>
    );
}

