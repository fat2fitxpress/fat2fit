import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Get in Touch with Fat2Fit',
    description: 'Have questions about our fitness programs, meal plans, or services? Contact the Fat2Fit team. We\'re here to help you on your fitness journey.',
    keywords: [
        'contact fat2fit',
        'fitness support',
        'customer service',
        'get in touch',
        'online fitness coach',
        'online nutritionist support',
        'workout plan help',
        'diet plan help',
    ],
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact Fat2Fit | Customer Support',
        description: 'Get in touch with our team. We\'re here to answer your fitness and nutrition questions.',
        url: 'https://fat2fitxpress.com/contact',
        type: 'website',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
