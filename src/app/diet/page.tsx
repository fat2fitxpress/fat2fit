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
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Diet & Nutrition - Fat2Fit',
    description: 'Discover healthy recipes and nutrition tips to fuel your journey.',
};

const mealPlans = [
    {
        title: 'Keto Kickstart',
        description: 'High fat, low carb meal plan designed to put your body into ketosis and burn fat for energy.',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200',
        prepTime: '20 mins',
        calories: '1800 kcal',
        category: 'Weight Loss',
    },
    {
        title: 'Mass Gainer',
        description: 'Clean bulking meal plan packed with complex carbs and high-quality protein to support muscle growth.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200',
        prepTime: '30 mins',
        calories: '3200 kcal',
        category: 'Muscle Building',
    },
    {
        title: 'Vegan Power',
        description: 'Plant-based nutrition that doesn\'t compromise on protein. Fuel your workouts with the power of nature.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200',
        prepTime: '25 mins',
        calories: '2200 kcal',
        category: 'Plant-Based',
    },
    {
        title: 'Mediterranean Balance',
        description: 'Heart-healthy meals focused on healthy fats, lean proteins, and plenty of fresh vegetables.',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200',
        prepTime: '15 mins',
        calories: '2400 kcal',
        category: 'Balanced',
    },
];

export default function DietPage() {
    return (
        <Box sx={{ bgcolor: 'background.default', pb: 10 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    mb: 8,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: 'rgba(0,0,0,0.6)',
                        },
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Fuel Your Ambition
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                        Discover nutrition plans and healthy recipes tailored to your fitness journey.
                    </Typography>
                    <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 8 }}>
                        Explore Recipes
                    </Button>
                </Container>
            </Box>

            <Container>
                {/* Category Filter Chips */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6 }}>
                    <Chip label="All Plans" color="primary" />
                    <Chip label="Weight Loss" variant="outlined" />
                    <Chip label="Muscle Building" variant="outlined" />
                    <Chip label="Vegan" variant="outlined" />
                    <Chip label="Balanced" variant="outlined" />
                </Stack>

                <Grid container spacing={4}>
                    {mealPlans.map((meal, index) => (
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
                                    image={meal.image}
                                    alt={meal.title}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                                        {meal.category}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                        {meal.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {meal.description}
                                    </Typography>

                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                        <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {meal.prepTime} Prep
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <LocalFireDepartmentIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {meal.calories} / Day
                                        </Typography>
                                    </Stack>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                    <Button fullWidth variant="outlined" sx={{ borderRadius: 4 }} startIcon={<RestaurantIcon />}>
                                        View Recipe
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Nutrition Tip Section */}
                <Box sx={{ mt: 10, p: 6, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
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
                            <Button variant="contained" size="large" sx={{ mt: 2, borderRadius: 8 }}>
                                More Nutrition Tips
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
