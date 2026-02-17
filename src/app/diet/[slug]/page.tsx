import { getDietBySlug, getAllDietSlugs } from '@/lib/diets';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbsNav from '@/components/BreadcrumbsNav';

export async function generateStaticParams() {
    const slugs = getAllDietSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const diet = getDietBySlug(slug);

    if (!diet) {
        return {
            title: 'Diet Plan Not Found',
        };
    }

    const dietUrl = `https://fat2fitxpress.com/diet/${slug}`;

    return {
        title: `${diet.title} - Detailed Diet Plan | Fat2Fit`,
        description: `Follow our detailed ${diet.title} program. Full day meal plan with ingredients and preparation steps. Perfect for achieving your fitness goals.`,
        keywords: [
            'diet plan',
            'meal plan',
            'nutrition guide',
            'healthy eating',
            diet.title.toLowerCase(),
            diet.category?.toLowerCase() || ''
        ],
        alternates: {
            canonical: `/diet/${slug}`,
        },
        openGraph: {
            title: `${diet.title} | Fat2Fit`,
            description: `Detailed diet plan for ${diet.title}. Complete meal plan with ingredients and nutrition guidance.`,
            url: dietUrl,
            type: 'article',
            siteName: 'Fat2Fit',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: `${diet.title} - Fat2Fit`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${diet.title} | Fat2Fit`,
            description: `Complete ${diet.title} meal plan with detailed ingredients and steps.`,
            images: ['/og-image.png'],
        },
    };
}

export default async function DietDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const diet = getDietBySlug(params.slug);

    if (!diet) {
        notFound();
    }

    const dietUrl = `https://fat2fitxpress.com/diet/${params.slug}`;

    // HowTo Schema for Diet Plan
    const dietSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: diet.title,
        description: `Complete diet plan for ${diet.title}`,
        url: dietUrl,
        image: 'https://fat2fitxpress.com/og-image.png',
        totalTime: 'P1D', // 1 day meal plan
    };

    // Breadcrumb Schema
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
            {
                '@type': 'ListItem',
                position: 3,
                name: diet.title,
                item: dietUrl,
            },
        ],
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(dietSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <BreadcrumbsNav
                items={[
                    { label: 'Diet Plans', href: '/diet' },
                    { label: diet.title, href: `/diet/${params.slug}` },
                ]}
            />
            <Link href="/diet" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: '#1976d2' }}>
                <ArrowBackIcon sx={{ mr: 1 }} />
                Back to All Plans
            </Link>

            <Box
                sx={{
                    bgcolor: 'background.paper',
                    p: { xs: 3, md: 6 },
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    '& h1': {
                        color: 'primary.main',
                        fontWeight: 'bold',
                        mb: 4,
                        fontSize: { xs: '2rem', md: '2.5rem' }
                    },
                    '& h2': {
                        color: 'text.primary',
                        mt: 6,
                        mb: 3,
                        fontWeight: 'bold',
                        borderBottom: '2px solid',
                        borderColor: 'primary.main',
                        display: 'inline-block',
                        pb: 1
                    },
                    '& h3': {
                        mt: 4,
                        mb: 2,
                        color: 'primary.light',
                        fontWeight: 'bold'
                    },
                    '& p': {
                        mb: 2,
                        lineHeight: 1.8,
                        color: 'text.secondary'
                    },
                    '& li': {
                        mb: 1.5,
                        color: 'text.secondary',
                        lineHeight: 1.6
                    },
                    '& hr': {
                        my: 6,
                        opacity: 0.1
                    }
                }}
            >
                <ReactMarkdown>{diet.content}</ReactMarkdown>
            </Box>

            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="text.primary">
                    Ready to transform your nutrition?
                </Typography>
                <Button variant="contained" size="large" sx={{ mt: 2, borderRadius: 8, px: 6 }}>
                    Start This Plan
                </Button>
            </Box>
        </Container>
    );
}
