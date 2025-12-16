import ComingSoon from '@/components/ComingSoon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Workout Plans - Fat2Fit',
    description: 'Explore our curated workout plans designed for all fitness levels.',
};

export default function WorkoutPage() {
    return <ComingSoon title="Workout Plans" />;
}
