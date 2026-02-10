import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { extractFAQs } from '@/lib/faqUtils';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

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

    return {
        title: `${post.title} | Fat2Fit`,
        description: post.excerpt,
        keywords: [
            'fitness tips',
            'workout advice',
            'health tips',
            'nutrition guide',
            'exercise tips',
            post.title.toLowerCase().split(' ').slice(0, 3).join(' ')
        ],
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
            images: ['/og-image.png'],
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

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {post.date} | By {post.author}
            </Typography>

            <Box sx={{ mt: 4, '& p': { mb: 2, lineHeight: 1.7 }, '& h1, & h2, & h3': { mt: 4, mb: 2 } }}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </Box>
        </Container>
    );
}
