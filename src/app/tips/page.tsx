import { getAllPosts } from '@/lib/posts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TipsGrid from '@/components/TipsGrid';
import Image from 'next/image';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Fitness Blog 2026: Expert Health & Workout Advice | Fat2Fit',
    description: 'The definitive 2026 fitness blog. Expert guides on progressive overload, reverse running, Japanese interval walking, strength training for women, and science-backed nutrition timing.',
    keywords: [
        'best fitness blog 2026',
        'top health advice',
        'expert fitness blog',
        'walking yoga for weight loss',
        'low-impact cardio benefits',
        'HIIT workouts for beginners',
        'fibermaxxing guide',
        'metabolic eating plan',
        'mental health benefits of exercise',
        'personalized nutrition 2026',
        'Japanese interval walking',
        'Japanese walking 2026',
        'science-backed health guides',
        'professional workout advice',
        'muscle building tips',
        'longevity fitness research',
        'progressive overload for women',
        'women strength training guide',
        'best weight loss tips for busy professionals',
        'bone density strength training',
        'cellular regeneration protocols',
        'nervous system regulation workout',
        'HIIT benefits',
        'workout recovery strategies',
        'nutrition timing guide',
        'health blog for transformation',
        'biohacking protocols 2026',
        'nervous system regulation',
        'red light therapy benefits',
        'menopause fitness management',
        'sleep optimization biometrics',
        'cellular regeneration tips',
        'reverse running guide',
        'reverse running benefits 2026',
        'deload week explained',
        'bone density strength training women',
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
            {
                '@type': 'Article',
                position: 7,
                name: 'Japanese Interval Walking',
                url: 'https://fat2fitxpress.com/tips/japanese-interval-walking',
            },
            {
                '@type': 'Article',
                position: 8,
                name: 'Progressive Overload for Women',
                url: 'https://fat2fitxpress.com/tips/progressive-overload-women-strength-training',
            },
            {
                '@type': 'Article',
                position: 9,
                name: 'Yoga for Weight Loss: The Surprising Truth',
                url: 'https://fat2fitxpress.com/tips/yoga-for-weight-loss-the-surprising-truth',
            },
            {
                '@type': 'Article',
                position: 10,
                name: '10,000 Steps vs. 30-Minute Workout',
                url: 'https://fat2fitxpress.com/tips/10000-steps-vs-30-minute-workout',
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
                    height: { xs: 'auto', md: '70vh' },
                    minHeight: { xs: 400, md: '70vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    overflow: 'hidden',
                    py: { xs: 8, md: 0 },
                }}
            >
                <Image
                    src="/tips_hero_bg.webp"
                    alt="Scientific health research and fitness advice"
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
                        bgcolor: 'rgba(0,0,0,0.55)',
                        zIndex: 1,
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            color: '#ffffff',
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                            lineHeight: 1.2,
                        }}
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

            {/* Tips Content Section */}
            <Box sx={{ bgcolor: 'action.hover', py: 8 }}>
                <Container maxWidth="lg">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(tipsSchema) }}
                    />
                    <TipsGrid posts={posts} title="Explore Our Fitness Tips" />
                </Container>
            </Box>
        </Box>
    );
}
