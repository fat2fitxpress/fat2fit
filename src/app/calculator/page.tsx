import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalculatorTabs from '@/components/calculators/CalculatorTabs';

export const metadata: Metadata = {
    title: 'Free Fitness Calculators - TDEE, BMI, Body Fat, Macros & More',
    description: 'Free fitness calculators: TDEE & calorie calculator, BMI calculator, body fat percentage, macro calculator, one rep max, and ideal weight. Science-backed formulas for your fitness goals.',
    keywords: [
        'calorie calculator', 'TDEE calculator', 'BMI calculator', 'body fat calculator',
        'macro calculator', 'one rep max calculator', 'ideal weight calculator',
        'fitness calculators', 'BMR calculator', 'Mifflin-St Jeor',
    ],
    alternates: {
        canonical: '/calculator',
    },
    openGraph: {
        title: 'Free Fitness Calculators | Fat2Fit',
        description: 'Calculate your TDEE, BMI, body fat %, macros, one rep max, and ideal weight with our free science-backed calculators.',
        url: 'https://fat2fitxpress.com/calculator',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Free Fitness Calculators - TDEE, BMI, Macros & More',
        description: 'All-in-one fitness calculators using scientifically-validated formulas.',
    },
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
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                    Fitness Calculators
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    Free science-backed calculators to help you reach your fitness goals.
                    Calculate your calories, BMI, body fat, macros, and more.
                </Typography>
            </Box>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
            />

            <CalculatorTabs />
        </Container>
    );
}
