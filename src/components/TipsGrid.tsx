'use client';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function TipsGrid({ posts }: { posts: Post[] }) {
    return (
        <Grid container spacing={4}>
            {posts.map((post) => (
                <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
                    <Card sx={{ height: '100%' }}>
                        <CardActionArea component={Link} href={`/tips/${post.slug}`} sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="caption" color="text.secondary" gutterBottom>
                                    {post.date}
                                </Typography>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.excerpt}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
