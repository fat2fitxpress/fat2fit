import { getAllPosts } from '@/lib/posts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TipsGrid from '@/components/TipsGrid';

export const metadata = {
    title: 'Fitness Tips & Blog - Fat2Fit',
    description: 'Read our latest articles on fitness, health, and nutrition.',
};

export default function TipsPage() {
    const posts = getAllPosts();

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
                Fitness Tips & Blog
            </Typography>

            <TipsGrid posts={posts} />
        </Container>
    );
}
