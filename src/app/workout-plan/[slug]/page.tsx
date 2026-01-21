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

    return {
        title: `${workout.title} - Detailed Workout Plan | Fat2Fit`,
        description: `Follow our detailed ${workout.title} program. Complete with exercises, sets, and reps for maximum results.`,
        openGraph: {
            title: `${workout.title} | Fat2Fit`,
            description: `Detailed workout plan for ${workout.title}.`,
            type: 'website',
        },
    };
}

export default async function WorkoutDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const workout = getWorkoutBySlug(params.slug);

    if (!workout) {
        notFound();
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
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
