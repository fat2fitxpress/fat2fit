import { getAllPosts, getPostBySlug } from '@/lib/posts';
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

    return {
        title: `${post.title} - Fat2Fit`,
        description: post.excerpt,
    };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
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
