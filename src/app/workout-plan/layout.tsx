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
    },
};

export default function WorkoutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
