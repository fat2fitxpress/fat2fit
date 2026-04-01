import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalculatorTabs from '@/components/calculators/CalculatorTabs';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Free Fitness Calculators 2026 - TDEE, BMI, Macros, BMR & Body Fat | Fat2Fit',
    description: 'Free online fitness calculators for 2026: TDEE, BMR, BMI, body fat %, macro breakdown, and one rep max. Science-backed tools for metabolic health optimization, longevity tracking, and personalized nutrition planning.',
    keywords: [
        'calorie calculator',
        'TDEE calculator',
        'TDEE calculator free',
        'BMI calculator',
        'body fat calculator',
        'macro calculator',
        'one rep max calculator',
        'ideal weight calculator',
        'fitness calculators 2026',
        'BMR calculator',
        'Mifflin-St Jeor',
        'calorie deficit calculator',
        'weight loss calculator',
        'macros for cutting',
        'macros for bulking',
        'TDEE calculator for fat loss',
        // Bio-Optimization & Tech
        'biological age testing calculator',
        'metabolic health calculator',
        'biomarker tracking tools',
        'continuous glucose monitor insights',
        'HRV recovery calculator',
        'AI fitness assessment',
        'precision nutrition calculator',
        'predictive health algorithms',
        // Longevity
        'longevity data assessment',
        'visceral fat calculator',
        'healthspan metrics',
        'grip strength assessment',
        'sarcopenia risk assessment',
        // Practical
        'online fitness coaching for weight loss',
        'TDEE calculator for busy professionals',
        'body recomposition calculator',
        'how many calories should I eat',
        'free calorie calculator online',
        'macro split for weight loss',
        'metabolic flexibility score',
    ],
    alternates: {
        canonical: '/calculator',
    },
    openGraph: {
        title: 'Free Fitness & Longevity Calculators 2026 | Fat2Fit',
        description: 'Calculate your TDEE, BMI, body fat %, macros, one rep max, and ideal weight. Science-backed tools for metabolic optimization and longevity tracking.',
        url: 'https://fat2fitxpress.com/calculator',
        type: 'website',
        siteName: 'Fat2Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Fat2Fit Fitness & Longevity Calculators 2026',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Fitness Calculators 2026 - TDEE, BMI, Macros & More',
        description: 'All-in-one fitness calculators using scientifically-validated formulas. Track metabolic health, plan macros, and optimize your longevity metrics.',
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
            name: 'Fitness Calculators',
            item: 'https://fat2fitxpress.com/calculator',
        },
    ],
};

const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fat2Fit Fitness Calculators',
    description: 'Free fitness calculators including TDEE, BMI, body fat percentage, macro calculator, one rep max, and ideal weight.',
    url: 'https://fat2fitxpress.com/calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    featureList: 'TDEE Calculator, BMI Calculator, Body Fat Calculator, Macro Calculator, One Rep Max Calculator, Ideal Weight Calculator',
};

export default function CalculatorPage() {
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
                    src="/calculator_hero_bg.jpg"
                    alt="Fitness calculators for TDEE, BMI, and Macros"
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
                            color: '#ffffff',
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                            lineHeight: 1.2,
                        }}
                    >
                        Fitness Calculators
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{ maxWidth: 800, mx: 'auto', color: 'rgba(255,255,255,0.9)' }}
                    >
                        Free science-backed calculators to help you reach your fitness goals. Calculate your calories,
                        BMI, body fat, macros, and more.
                    </Typography>
                </Container>
            </Box>

            {/* Calculators Section */}
            <Box sx={{ bgcolor: 'action.hover', py: 8 }}>
                <Container maxWidth="lg">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                    />

                    <CalculatorTabs />
                </Container>
            </Box>
        </Box>
    );
}
