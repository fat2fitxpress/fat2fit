import { getWorkoutBySlug, getAllWorkoutSlugs } from '@/lib/workouts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DetailPageLayout from '@/components/DetailPageLayout';

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
        <DetailPageLayout
            content={workout.content}
            breadcrumbs={[
                { label: 'Workout Plans', href: '/workout-plan' },
                { label: workout.title, href: `/workout-plan/${params.slug}` },
            ]}
            backHref="/workout-plan"
            backLabel="Back to All Plans"
            ctaHeading="Ready to track your progress?"
            ctaButtonText="Start This Workout"
            schemas={[workoutSchema, breadcrumbSchema]}
        />
    );
}
