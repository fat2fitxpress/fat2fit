'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

interface RelatedItem {
    title: string;
    href: string;
    type: 'tip' | 'diet' | 'workout';
}

interface RelatedContentProps {
    items: RelatedItem[];
    title?: string;
}

export default function RelatedContent({ items, title = 'Related Content' }: RelatedContentProps) {
    if (items.length === 0) return null;

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'tip':
                return 'primary';
            case 'diet':
                return 'success';
            case 'workout':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'tip':
                return 'Fitness Tip';
            case 'diet':
                return 'Diet Plan';
            case 'workout':
                return 'Workout';
            default:
                return 'Content';
        }
    };

    return (
        <Box sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                {title}
            </Typography>
            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid key={item.href} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card
                            component={Link}
                            href={item.href}
                            sx={{
                                height: '100%',
                                textDecoration: 'none',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4,
                                },
                            }}
                        >
                            <CardContent>
                                <Chip
                                    label={getTypeLabel(item.type)}
                                    color={getTypeColor(item.type)}
                                    size="small"
                                    sx={{ mb: 1.5 }}
                                />
                                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                    {item.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
