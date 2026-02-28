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
