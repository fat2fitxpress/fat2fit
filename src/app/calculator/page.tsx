import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalculatorForm from '@/components/CalculatorForm';
import Paper from '@mui/material/Paper';

export const metadata: Metadata = {
    title: 'Maintenance Calorie Calculator - Fat2Fit',
    description: 'Calculate your daily maintenance calories using the Mifflin-St Jeor equation.',
};

export default function CalculatorPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                    Calorie Calculator
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    Calculate your Total Daily Energy Expenditure (TDEE) to understand how many calories
                    you need to maintain your current weight based on your activity level.
                </Typography>
            </Box>

            <CalculatorForm />

            <Box sx={{ mt: 10, maxWidth: 800, mx: 'auto' }}>
                <Paper variant="outlined" sx={{ p: 4, bgcolor: 'background.default' }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                        Scientific Reference
                    </Typography>
                    <Typography paragraph color="text.secondary">
                        This calculator uses the <strong>Mifflin-St Jeor Equation</strong>, which is widely consider
                        one of the most accurate formulas for calculating Basal Metabolic Rate (BMR).
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                        The Formulas
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                        <Typography component="li" paragraph>
                            <strong>Men:</strong> (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Women:</strong> (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
                        </Typography>
                    </Box>

                    <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                        Activity Multipliers
                    </Typography>
                    <Typography paragraph color="text.secondary">
                        Your TDEE is calculated by multiplying your BMR by an activity factor:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                        <li><strong>Sedentary (1.2):</strong> Little or no exercise</li>
                        <li><strong>Lightly Active (1.375):</strong> Light exercise/sports 1-3 days/week</li>
                        <li><strong>Moderately Active (1.55):</strong> Moderate exercise/sports 3-5 days/week</li>
                        <li><strong>Active (1.725):</strong> Hard exercise/sports 6-7 days/week</li>
                        <li><strong>Very Active (1.9):</strong> Very hard exercise/sports & physical job</li>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
