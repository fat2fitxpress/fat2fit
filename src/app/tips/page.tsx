import { getAllPosts } from '@/lib/posts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TipsGrid from '@/components/TipsGrid';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fitness Tips & Health Blog - Expert Advice',
    description: 'Read our latest fitness tips, workout advice, nutrition guides, and health blog posts. Expert insights to help you achieve your fitness goals.',
    keywords: ['fitness tips', 'health blog', 'workout advice', 'nutrition tips', 'fitness articles', 'exercise guides', 'health advice'],
    alternates: {
        canonical: '/tips',
    },
    openGraph: {
        title: 'Fitness Tips & Expert Health Blog | Fat2Fit',
        description: 'Expert fitness tips and health advice to help you reach your goals.',
        url: 'https://fat2fitxpress.com/tips',
        type: 'website',
    },
};

const tipsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Fitness Tips & Blog',
    description: 'Expert advice on fitness, health, and nutrition',
    url: 'https://fat2fitxpress.com/tips',
};

export default function TipsPage() {
    const posts = getAllPosts();

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tipsSchema) }}
            />
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
                Fitness Tips & Blog
            </Typography>

            <TipsGrid posts={posts} />
        </Container>
    );
}
