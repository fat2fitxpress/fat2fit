import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { extractFAQs } from '@/lib/faqUtils';
import { notFound } from 'next/navigation';
import DetailPageLayout from '@/components/DetailPageLayout';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const articleUrl = `https://fat2fitxpress.com/tips/${slug}`;

    const baseKeywords = [
        'fitness tips 2026',
        'workout advice',
        'health tips',
        'nutrition guide',
        'exercise tips',
        'longevity fitness',
        'bio-optimization guide',
        'science-backed health',
        post.title.toLowerCase().split(' ').slice(0, 3).join(' '),
    ];

    const extraKeywords: string[] = [];

    if (slug === 'cortisol-stress-hormonal-health') {
        extraKeywords.push(
            'cortisol belly fat',
            'stress weight gain',
            'high cortisol symptoms',
            'morning routine to lower cortisol',
            'sleep and cortisol',
            'bio-syncing',
            'circadian rhythm fitness',
            'morning cortisol light exposure',
            'vagus nerve stimulation',
            'hormonal fat loss',
            'breathwork for cortisol reduction',
            'nervous system regulation',
            'sleep hygiene rituals',
            'JOMO wellness mindset',
        );
    }

    if (slug === 'glp1-medications-natural-alternatives') {
        extraKeywords.push(
            'GLP-1 medications',
            'Ozempic alternatives',
            'Wegovy alternatives',
            'Ozempic natural alternatives',
            'GLP-1 weight loss',
            'GLP-1 companion workouts',
            'prevent muscle loss GLP-1',
            'natural GLP-1 boosters',
            'metabolic flexibility',
            'high protein fat loss',
            'microbiome personalization',
            'postbiotic supplements',
            'GLP-1 natural alternatives 2026',
        );
    }

    if (slug === 'fitness-tracking-wearable-technology') {
        extraKeywords.push(
            'best fitness tracker 2026',
            'smartwatch vs smart ring',
            'best smart ring 2026',
            'Oura Ring 4 review',
            'Garmin Venu 4 review',
            'Apple Watch fitness tracking',
            'Samsung Galaxy Ring review',
            'fitness wearable technology',
            'health tracking wearables',
            'wearable fitness device comparison',
            'AI fitness coaching 2026',
            'Casio health smartwatch',
            'biometric readiness score',
            'digital twin health tracking',
            'smart ring sleep analysis',
            'continuous glucose monitor for non-diabetics',
            'HRV recovery tracking',
            'biological age testing wearable',
            'biomarker integration',
        );
    }

    if (slug === 'recovery-rest-importance') {
        extraKeywords.push(
            'cold plunge recovery',
            'cold plunge and sauna benefits',
            'cognitive resilience',
            'sleep hygiene 2026',
            'sleep hygiene rituals',
            'infrared sauna benefits',
            'active recovery sessions',
            'muscle repair science',
            'overtraining prevention',
            'nervous system regulation',
            'red light therapy for recovery',
            'deload week explained',
        );
    }

    if (slug === '10000-steps-vs-30-minute-workout' || slug === 'japanese-interval-walking') {
        extraKeywords.push(
            '10000 steps vs 30 minute workout',
            'walking vs gym for weight loss',
            'is 10000 steps enough',
            'NEAT vs exercise',
            'walking for fat loss',
            'best daily step goal 2026',
            'calories burned in 10000 steps',
            'walking health benefits',
            'functional longevity',
            'zone 2 walking',
            'VO2 max improvement',
            'mitochondrial health exercises',
            'longevity biohacking',
        );
    }

    if (slug === 'fibermaxxing-fiber-intake-fat-loss-gut-health') {
        extraKeywords.push(
            'fibermaxxing',
            'fibermaxxing guide 2026',
            'fibermaxxing recipes',
            'high fiber diet for fat loss',
            'how much fiber per day',
            'fiber for gut health',
            'best high fiber foods',
            'fiber and weight loss',
            'fiber and muscle building',
            'fiber bloating',
            'soluble fiber belly fat',
            'gut microbiome diet',
            'fiber vs calorie counting',
            'microbiome personalization',
            'postbiotic supplements',
            'ultra-processed food UPF',
        );
    }

    if (slug === 'yoga-for-weight-loss-the-surprising-truth') {
        extraKeywords.push(
            'yoga for weight loss',
            'can yoga help lose weight',
            'somatic yoga for trauma',
            'walking yoga',
            'yoga for belly fat',
            'yoga cortisol reduction',
            'yoga for stress relief',
            'power yoga fat loss',
            'mind-body integration workouts',
            'breathwork for cortisol reduction',
            'chair yoga for seniors',
        );
    }

    if (slug === 'muscle-building-guide') {
        extraKeywords.push(
            'muscle building guide 2026',
            'progressive overload guide',
            'sarcopenia prevention exercises',
            'grip strength for longevity',
            'lean muscle building',
            'strength training for longevity',
            'bone density strength training',
            'protein for muscle growth',
            'calisthenics for beginners',
            'Hyrox training for beginners',
        );
    }

    if (slug === 'hiit-workout-benefits') {
        extraKeywords.push(
            'HIIT workout benefits 2026',
            'HIIT for longevity',
            'HIIT vs Zone Zero training',
            'snack-sized HIIT workouts',
            'micro-habits for fitness',
            'metabolic conditioning',
            'HIIT for beginners',
            'tabata benefits',
            'HIIT fat loss science',
        );
    }

    if (slug === 'nutrition-timing-guide') {
        extraKeywords.push(
            'nutrition timing 2026',
            'meal timing for fat loss',
            'pre workout nutrition',
            'post workout nutrition',
            'metabolic flexibility training',
            'glucose-friendly meals',
            'continuous glucose monitor meal plan',
            'circadian rhythm eating',
            'nutrient timing for muscle building',
        );
    }

    if (slug === 'importance-of-hydration') {
        extraKeywords.push(
            'hydration for fat loss',
            'how much water should I drink',
            'hydration and metabolism',
            'electrolyte balance fitness',
            'hydration for workout performance',
            'dehydration symptoms athletes',
            'hydration for gut health',
            'water intake calculator',
        );
    }

    if (slug === 'common-workout-mistakes') {
        extraKeywords.push(
            'common workout mistakes 2026',
            'overtraining prevention',
            'beginner workout mistakes',
            'gym mistakes to avoid',
            'deload week explained',
            'progressive overload mistakes',
            'recovery and rest mistakes',
            'workout form mistakes',
        );
    }

    if (slug === 'zone-2-cardio-training-guide') {
        extraKeywords.push(
            'Zone 2 cardio benefits',
            'Zone 2 training guide 2026',
            'Zone Zero training',
            'low-intensity functional training',
            'mitochondrial health exercises',
            'VO2 max improvement',
            'longevity cardio',
            'aerobic base training',
            'heart rate zone training',
            'fat burning zone',
        );
    }

    if (slug === 'progressive-overload-women-strength-training') {
        extraKeywords.push(
            'progressive overload for women 2026',
            'women strength training guide',
            'bone density strength training women',
            'menopause fitness management',
            'cycle syncing workouts',
            'Pilates for core strength',
            'sarcopenia prevention women',
            'women muscle building guide',
            'female body recomposition',
        );
    }

    if (slug === 'fat-loss-vs-weight-loss') {
        extraKeywords.push(
            'fat loss vs weight loss explained',
            'body recomposition guide',
            'visceral fat reduction tips',
            'lean body mass vs fat mass',
            'metabolic health optimization',
            'body fat percentage guide',
            'healthy weight loss rate',
            'scale weight vs body composition',
        );
    }

    if (slug === '10-tips-for-weight-loss') {
        extraKeywords.push(
            'best weight loss tips 2026',
            'sustainable weight loss',
            'visceral fat reduction',
            'metabolic flexibility',
            'fibermaxxing for weight loss',
            'micro-habits for weight loss',
            'sleep hygiene for weight loss',
            'NEAT for fat loss',
            'calorie deficit tips',
        );
    }

    return {
        title: `${post.title} | Fat2Fit`,
        description: post.excerpt,
        keywords: [...baseKeywords, ...extraKeywords],
        authors: [{ name: post.author }],
        alternates: {
            canonical: `/tips/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: articleUrl,
            type: 'article',
            siteName: 'Fat2Fit',
            publishedTime: post.date,
            authors: [post.author],
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: `${post.title} - Fat2Fit`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image || '/og-image.png'],
            site: '@fat2fit',
            creator: '@fat2fit',
        },
    };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const articleUrl = `https://fat2fitxpress.com/tips/${params.slug}`;

    // Article Schema Markup
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,

        description: post.excerpt,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Fat2Fit',
            logo: {
                '@type': 'ImageObject',
                url: 'https://fat2fitxpress.com/logo.png',
            },
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
        },
        image: 'https://fat2fitxpress.com/og-image.png',
    };

    // Breadcrumb Schema Markup
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
                name: 'Fitness Tips',
                item: 'https://fat2fitxpress.com/tips',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: articleUrl,
            },
        ],
    };

    // FAQ Schema Markup (if FAQs exist in content)
    const faqs = extractFAQs(post.content);
    const faqSchema = faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    } : null;

    const schemas = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

    return (
        <DetailPageLayout
            content={post.content}
            breadcrumbs={[
                { label: 'Fitness Tips', href: '/tips' },
                { label: post.title, href: `/tips/${params.slug}` },
            ]}
            showBreadcrumbs={false}
            backHref="/tips"
            backLabel="Back to All Tips"
            ctaHeading="Want more fitness tips?"
            ctaButtonText="Explore More Tips"
            ctaHref="/tips"
            schemas={schemas}
            author={post.author}
            date={post.date}
        />

    );
}

