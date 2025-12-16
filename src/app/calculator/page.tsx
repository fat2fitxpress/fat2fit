import ComingSoon from '@/components/ComingSoon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fitness Calculators - Fat2Fit',
    description: 'Calculate your BMI, BMR, and other fitness metrics.',
};

export default function CalculatorPage() {
    return <ComingSoon title="Calculators" />;
}
