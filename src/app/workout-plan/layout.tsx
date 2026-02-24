import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Workout Plans - Strength, HIIT, Cardio & Core Training',
    description: 'Browse professional workout plans for all fitness levels. Choose from strength training, HIIT, cardio, and core workouts designed by experts. Beginner to advanced programs available.',
    keywords: ['workout plans', 'strength training', 'HIIT workouts', 'cardio exercises', 'core training', 'fitness programs', 'beginner workouts', 'advanced training'],
    alternates: {
        canonical: '/workout-plan',
    },
    openGraph: {
        title: 'Professional Workout Plans | Fat2Fit',
        description: '12 expertly designed workout plans across 4 categories. Find the perfect program for your fitness goals.',
        url: 'https://fat2fitxpress.com/workout-plan',
        type: 'website',
        siteName: 'Fat2Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Fat2Fit Workout Plans',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Professional Workout Plans | Fat2Fit',
        description: 'Strength, HIIT, cardio, and core training plans for every fitness level.',
        images: ['/og-image.png'],
    },
};

export default function WorkoutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
