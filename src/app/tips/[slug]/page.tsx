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
        'fitness tips',
        'workout advice',
        'health tips',
        'nutrition guide',
        'exercise tips',
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
        );
    }

    if (slug === 'glp1-medications-natural-alternatives') {
        extraKeywords.push(
            'GLP-1 medications',
            'Ozempic alternatives',
            'Wegovy alternatives',
            'Ozempic natural alternatives',
            'GLP-1 weight loss',
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
        '@type': 'Article',
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
        />
    );
}

