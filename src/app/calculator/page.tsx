import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalculatorTabs from '@/components/calculators/CalculatorTabs';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Free Fitness Calculators - TDEE, BMI, Body Fat, Macros & More',
    description: 'Free fitness calculators: TDEE & calorie calculator, BMI calculator, body fat percentage, macro calculator, one rep max, and ideal weight. Science-backed formulas for your fitness goals.',
    keywords: [
        'calorie calculator',
        'TDEE calculator',
        'BMI calculator',
        'body fat calculator',
        'macro calculator',
        'one rep max calculator',
        'ideal weight calculator',
        'fitness calculators',
        'BMR calculator',
        'Mifflin-St Jeor',
        'calorie deficit calculator',
        'weight loss calculator',
        'macros for cutting',
        'macros for bulking',
        'TDEE calculator for fat loss',
        'online fitness calculator',
        'body composition calculator',
        'health tools',
        'fitness assessment',
        'science based calculators',
    ],
    alternates: {
        canonical: '/calculator',
    },
    openGraph: {
        title: 'Free Fitness Calculators | Fat2Fit',
        description: 'Calculate your TDEE, BMI, body fat %, macros, one rep max, and ideal weight with our free science-backed calculators.',
        url: 'https://fat2fitxpress.com/calculator',
        type: 'website',
        siteName: 'Fat2Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Fat2Fit Fitness Calculators',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Fitness Calculators - TDEE, BMI, Macros & More',
        description: 'All-in-one fitness calculators using scientifically-validated formulas.',
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
                    src="/calculator_hero_bg.jpg"
                    alt="Fitness calculator background"
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
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#ffffff' }}>
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

            <Container maxWidth="lg" sx={{ pb: 6 }}>
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
    );
}
