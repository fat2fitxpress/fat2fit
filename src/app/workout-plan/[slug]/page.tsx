import { getWorkoutBySlug, getAllWorkoutSlugs } from '@/lib/workouts';
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
    const slugs = getAllWorkoutSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const workout = getWorkoutBySlug(slug);

    if (!workout) {
        return {
            title: 'Workout Plan Not Found',
        };
    }

    const workoutUrl = `https://fat2fitxpress.com/workout-plan/${slug}`;

    return {
        title: `${workout.title} - Detailed Workout Plan | Fat2Fit`,
        description: `Follow our detailed ${workout.title} program. Complete with exercises, sets, reps, and form guidance for maximum results.`,
        keywords: [
            'workout plan',
            'exercise routine',
            'fitness program',
            'strength training',
            workout.title.toLowerCase()
        ],
        alternates: {
            canonical: `/workout-plan/${slug}`,
        },
        openGraph: {
            title: `${workout.title} | Fat2Fit`,
            description: `Detailed workout plan for ${workout.title}. Complete exercise program with sets, reps, and expert guidance.`,
            url: workoutUrl,
            type: 'article',
            siteName: 'Fat2Fit',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: `${workout.title} - Fat2Fit`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${workout.title} | Fat2Fit`,
            description: `Complete ${workout.title} with detailed exercises, sets, and reps.`,
            images: ['/og-image.png'],
        },
    };
}

export default async function WorkoutDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const workout = getWorkoutBySlug(params.slug);

    if (!workout) {
        notFound();
    }

    const workoutUrl = `https://fat2fitxpress.com/workout-plan/${params.slug}`;

    // ExercisePlan Schema
    const workoutSchema = {
        '@context': 'https://schema.org',
        '@type': 'ExercisePlan',
        name: workout.title,
        description: `Complete workout plan for ${workout.title}`,
        url: workoutUrl,
        image: 'https://fat2fitxpress.com/og-image.png',
        activityFrequency: 'Weekly',
        exerciseType: 'Strength training, Cardio, HIIT',
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
                name: 'Workout Plans',
                item: 'https://fat2fitxpress.com/workout-plan',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: workout.title,
                item: workoutUrl,
            },
        ],
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(workoutSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <BreadcrumbsNav
                items={[
                    { label: 'Workout Plans', href: '/workout-plan' },
                    { label: workout.title, href: `/workout-plan/${params.slug}` },
                ]}
            />
            <Link href="/workout-plan" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: '#1976d2' }}>
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
                <ReactMarkdown>{workout.content}</ReactMarkdown>
            </Box>

            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="text.primary">
                    Ready to track your progress?
                </Typography>
                <Button variant="contained" size="large" sx={{ mt: 2, borderRadius: 8, px: 6 }}>
                    Start This Workout
                </Button>
            </Box>
        </Container>
    );
}
