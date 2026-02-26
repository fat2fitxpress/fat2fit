import { getAllPosts } from '@/lib/posts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TipsGrid from '@/components/TipsGrid';
import Image from 'next/image';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fitness Tips & Expert Health Advice - Free Workout & Nutrition Guides',
    description: 'Discover expert fitness tips, workout guides, nutrition advice, and health strategies. Learn about muscle building, HIIT training, recovery, nutrition timing, and avoid common workout mistakes. Free science-backed fitness content.',
    keywords: [
        'fitness tips',
        'workout advice',
        'nutrition tips',
        'muscle building tips',
        'HIIT benefits',
        'workout mistakes',
        'recovery tips',
        'nutrition timing',
        'health blog',
        'fitness articles',
        'exercise guides',
        'strength training tips',
        'weight loss tips',
        'fitness for beginners',
        'workout recovery',
        'pre workout nutrition',
        'post workout nutrition',
        'how to build muscle',
        'fitness mistakes to avoid'
    ],
    alternates: {
        canonical: '/tips',
    },
    openGraph: {
        title: 'Expert Fitness Tips & Health Advice | Fat2Fit',
        description: 'Free expert fitness tips on muscle building, HIIT training, nutrition timing, recovery, and workout mistakes. Science-backed advice to achieve your fitness goals faster.',
        url: 'https://fat2fitxpress.com/tips',
        type: 'website',
        siteName: 'Fat2Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Fat2Fit Fitness Tips and Health Blog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Expert Fitness Tips & Health Advice | Fat2Fit',
        description: 'Free expert fitness tips on muscle building, HIIT, nutrition, and recovery.',
        images: ['/og-image.png'],
    },
};

const tipsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Fitness Tips & Expert Health Blog',
    description: 'Comprehensive collection of expert fitness tips, workout guides, nutrition advice, and health strategies for achieving your fitness goals.',
    url: 'https://fat2fitxpress.com/tips',
    publisher: {
        '@type': 'Organization',
        name: 'Fat2Fit',
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
                name: 'Fitness Tips',
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

