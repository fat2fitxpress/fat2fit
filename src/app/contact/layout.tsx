import type { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
    title: 'Contact Us - Get in Touch with Fat2Fit | Fitness & Longevity Support',
    description: 'Have questions about our longevity protocols, fibermaxxing guides, workout plans, or AI coaching? Contact the Fat2Fit team. We\'re here to support your fitness and healthspan optimization journey.',
    keywords: [
        'contact fat2fit',
        'fitness support',
        'customer service',
        'get in touch',
        'online fitness coach',
        'online nutritionist support',
        'workout plan help',
        'diet plan help',
        'fat2fit contact',
        'fitness app support',
        // 2026 trending
        'community-based fitness motivation',
        'AI fitness coaching support',
        'longevity coaching help',
        'personalized wellness support',
        'fibermaxxing guidance',
        'healthspan optimization help',
    ],
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact Fat2Fit | Fitness & Longevity Support',
        description: 'Get in touch with our team. We\'re here to answer your fitness, nutrition, and longevity questions.',
        url: 'https://fat2fitxpress.com/contact',
        type: 'website',
        siteName: 'Fat2Fit',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Contact Fat2Fit - Fitness & Longevity Support',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Fat2Fit | Fitness & Longevity Support',
        description: 'Get in touch with our team for fitness, nutrition, and longevity coaching support.',
        images: ['/og-image.png'],
        site: '@fat2fit',
        creator: '@fat2fit',
    },
};

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
            name: 'Contact',
            item: 'https://fat2fitxpress.com/contact',
        },
    ],
};

const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Fat2Fit',
    description: 'Get in touch with the Fat2Fit team for fitness and nutrition support.',
    url: 'https://fat2fitxpress.com/contact',
    mainEntity: {
        '@type': 'Organization',
        name: 'Fat2Fit',
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'contact@fat2fitxpress.com',
            contactType: 'Customer Service',
        },
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            {children}
        </>
    );
}
