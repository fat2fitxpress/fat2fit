'use client';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function TipsGrid({ posts }: { posts: Post[] }) {
    return (
        <Grid container spacing={3}>
            {posts.map((post) => (
                <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
                    <Card
                        elevation={0}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0px 10px 20px rgba(0,0,0,0.15)',
                            }
                        }}
                    >
                        <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                            <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>
                                Expert Tip
                            </Typography>
                            <Typography variant="caption" color="text.secondary" gutterBottom sx={{ display: 'block', mb: 1 }}>
                                {post.date}
                            </Typography>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post.excerpt}
                            </Typography>
                        </CardContent>
                        <Box sx={{ p: 2, pt: 0 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    borderRadius: 4,
                                    py: 1,
                                    fontSize: '0.9rem',
                                    textTransform: 'none',
                                    fontWeight: 600
                                }}
                                component={Link}
                                href={`/tips/${post.slug}`}
                            >
                                Read Tip
                            </Button>
                        </Box>
                    </Card>

                </Grid>
            ))}
        </Grid>
    );
}

