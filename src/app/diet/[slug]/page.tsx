import { getDietBySlug, getAllDietSlugs } from '@/lib/diets';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DetailPageLayout from '@/components/DetailPageLayout';

export async function generateStaticParams() {
    const slugs = getAllDietSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const diet = getDietBySlug(slug);

    if (!diet) {
        return {
            title: 'Diet Plan Not Found',
        };
    }

    const dietUrl = `https://fat2fitxpress.com/diet/${slug}`;

    return {
        title: `${diet.title} - Detailed Diet Plan | Fat2Fit`,
        description: `Follow our detailed ${diet.title} program. Full day meal plan with ingredients and preparation steps. Perfect for achieving your fitness goals.`,
        keywords: [
            'diet plan',
            'meal plan',
            'nutrition guide',
            'healthy eating',
            diet.title.toLowerCase(),
            diet.category?.toLowerCase() || ''
        ],
        alternates: {
            canonical: `/diet/${slug}`,
        },
        openGraph: {
            title: `${diet.title} | Fat2Fit`,
            description: `Detailed diet plan for ${diet.title}. Complete meal plan with ingredients and nutrition guidance.`,
            url: dietUrl,
            type: 'article',
            siteName: 'Fat2Fit',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: `${diet.title} - Fat2Fit`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${diet.title} | Fat2Fit`,
            description: `Complete ${diet.title} meal plan with detailed ingredients and steps.`,
            images: ['/og-image.png'],
        },
    };
}

export default async function DietDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const diet = getDietBySlug(params.slug);

    if (!diet) {
        notFound();
    }

    const dietUrl = `https://fat2fitxpress.com/diet/${params.slug}`;

    // HowTo Schema for Diet Plan
    const dietSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: diet.title,
        description: `Complete diet plan for ${diet.title}`,
        url: dietUrl,
        image: 'https://fat2fitxpress.com/og-image.png',
        totalTime: 'P1D', // 1 day meal plan
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
                name: 'Diet Plans',
                item: 'https://fat2fitxpress.com/diet',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: diet.title,
                item: dietUrl,
            },
        ],
    };

    return (
        <DetailPageLayout
            content={diet.content}
            breadcrumbs={[
                { label: 'Diet Plans', href: '/diet' },
                { label: diet.title, href: `/diet/${params.slug}` },
            ]}
            backHref="/diet"
            backLabel="Back to All Plans"
            ctaHeading="Ready to transform your nutrition?"
            ctaButtonText="Start This Plan"
            ctaHref="/calculator"
            schemas={[dietSchema, breadcrumbSchema]}
        />
    );
}
