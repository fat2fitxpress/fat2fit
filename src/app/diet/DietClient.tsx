'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';
import { DietDetail } from '@/lib/diets';

interface DietClientProps {
    initialDiets: DietDetail[];
}

export default function DietClient({ initialDiets }: DietClientProps) {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

    const categories = ['All', 'Weight Loss', 'Muscle Building', 'Vegan', 'Balanced'];

    const filteredDiets = selectedCategory === 'All'
        ? initialDiets
        : initialDiets.filter(diet => diet.category === selectedCategory);

    return (
        <Container>
            {/* Category Filter Chips */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6, flexWrap: 'wrap', gap: 2 }}>
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category === 'All' ? 'All Plans' : category}
                        color={selectedCategory === category ? 'primary' : 'default'}
                        variant={selectedCategory === category ? 'filled' : 'outlined'}
                        onClick={() => setSelectedCategory(category)}
                        sx={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            }
                        }}
                    />
                ))}
            </Stack>

            <Grid container spacing={4}>
                {filteredDiets.map((diet, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
                            <CardMedia
                                component="img"
                                height="200"
                                image={diet.image}
                                alt={diet.title}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                                    {diet.category}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                    {diet.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {diet.description}
                                </Typography>

                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {diet.prepTime} Prep
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <LocalFireDepartmentIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {diet.calories} / Day
                                    </Typography>
                                </Stack>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ borderRadius: 4 }}
                                    startIcon={<RestaurantIcon />}
                                    component={Link}
                                    href={`/diet/${diet.slug}`}
                                >
                                    View Recipe
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Nutrition Tip Section */}
            <Box sx={{ mt: 10, p: { xs: 3, md: 6 }, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800"
                            sx={{ width: '100%', borderRadius: 4, boxShadow: 3 }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                            Expert Advice
                        </Typography>
                        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                            The 80/20 Rule
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
                            Sustainable healthy eating is not about restriction, but about balance. The 80/20 rule suggests eating nutrient-dense whole foods 80% of the time, and allowing for your favorite treats for the remaining 20%.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
                            This approach helps prevent burnout and makes a healthy lifestyle achievable in the long term.
                        </Typography>
                        <Button variant="contained" size="large" sx={{ mt: 2, borderRadius: 8 }} component={Link} href="/tips">
                            More Nutrition Tips
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
