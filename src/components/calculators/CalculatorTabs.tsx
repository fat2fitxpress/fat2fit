'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import CalculatorForm from '@/components/CalculatorForm';
import BMICalculator from '@/components/calculators/BMICalculator';
import BodyFatCalculator from '@/components/calculators/BodyFatCalculator';
import MacroCalculator from '@/components/calculators/MacroCalculator';
import OneRepMaxCalculator from '@/components/calculators/OneRepMaxCalculator';
import IdealWeightCalculator from '@/components/calculators/IdealWeightCalculator';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`calc-tabpanel-${index}`}
            aria-labelledby={`calc-tab-${index}`}
        >
            {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
        </div>
    );
}

const TABS = [
    { label: 'TDEE Calculator', description: 'Calculate your Total Daily Energy Expenditure and maintenance calories.' },
    { label: 'BMI', description: 'Calculate your Body Mass Index to assess whether your weight is healthy.' },
    { label: 'Body Fat %', description: "Estimate your body fat percentage using the US Navy method." },
    { label: 'Macros', description: 'Get your daily protein, carbs, and fat targets based on your goals.' },
    { label: 'One Rep Max', description: 'Estimate your maximum lift for any exercise based on weight and reps.' },
    { label: 'Ideal Weight', description: 'Find your ideal weight range using four established medical formulas.' },
];

export default function CalculatorTabs() {
    const [tab, setTab] = React.useState(0);

    return (
        <Box>
            <Paper variant="outlined" sx={{ mb: 3 }}>
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="Fitness calculator tabs"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            minHeight: 56,
                        },
                    }}
                >
                    {TABS.map((t, i) => (
                        <Tab
                            key={t.label}
                            label={t.label}
                            id={`calc-tab-${i}`}
                            aria-controls={`calc-tabpanel-${i}`}
                        />
                    ))}
                </Tabs>
            </Paper>

            {/* Tab description */}
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
                {TABS[tab].description}
            </Typography>

            <TabPanel value={tab} index={0}>
                <CalculatorForm />
                <Box sx={{ mt: 6, maxWidth: 700, mx: 'auto' }}>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: 'background.default' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Scientific Reference
                        </Typography>
                        <Typography paragraph color="text.secondary">
                            This calculator uses the <strong>Mifflin-St Jeor Equation</strong>, which is widely considered
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
                            <li><strong>Very Active (1.9):</strong> Very hard exercise/sports &amp; physical job</li>
                        </Box>
                    </Paper>
                </Box>
            </TabPanel>

            <TabPanel value={tab} index={1}>
                <BMICalculator />
                <Box sx={{ mt: 6, maxWidth: 700, mx: 'auto' }}>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: 'background.default' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Scientific Reference
                        </Typography>
                        <Typography paragraph color="text.secondary">
                            Body Mass Index (BMI) was developed by Belgian mathematician <strong>Adolphe Quetelet</strong> in the 1830s.
                            It provides a simple numeric measure of a person&apos;s thickness or thinness.
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            The Formula
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <Typography component="li" paragraph>
                                <strong>BMI</strong> = weight (kg) ÷ height² (m²)
                            </Typography>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            WHO Classification
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <li><strong>Underweight:</strong> BMI &lt; 18.5</li>
                            <li><strong>Normal weight:</strong> BMI 18.5 – 24.9</li>
                            <li><strong>Overweight:</strong> BMI 25.0 – 29.9</li>
                            <li><strong>Obese Class I:</strong> BMI 30.0 – 34.9</li>
                            <li><strong>Obese Class II:</strong> BMI 35.0 – 39.9</li>
                            <li><strong>Obese Class III:</strong> BMI ≥ 40.0</li>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                            Source: World Health Organization (WHO) — Global Database on Body Mass Index
                        </Typography>
                    </Paper>
                </Box>
            </TabPanel>

            <TabPanel value={tab} index={2}>
                <BodyFatCalculator />
                <Box sx={{ mt: 6, maxWidth: 700, mx: 'auto' }}>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: 'background.default' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Scientific Reference
                        </Typography>
                        <Typography paragraph color="text.secondary">
                            This calculator uses the <strong>U.S. Navy Circumference Method</strong>, developed by
                            Hodgdon and Beckett at the Naval Health Research Center (1984). It estimates body fat
                            percentage from simple tape measurements.
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            The Formulas
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <Typography component="li" paragraph>
                                <strong>Men:</strong> 86.010 × log₁₀(waist − neck) − 70.041 × log₁₀(height) + 36.76
                            </Typography>
                            <Typography component="li" paragraph>
                                <strong>Women:</strong> 163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387
                            </Typography>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            Body Fat Categories (Male / Female)
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <li><strong>Essential Fat:</strong> 2–5% / 10–13%</li>
                            <li><strong>Athletes:</strong> 6–13% / 14–20%</li>
                            <li><strong>Fitness:</strong> 14–17% / 21–24%</li>
                            <li><strong>Average:</strong> 18–24% / 25–31%</li>
                            <li><strong>Obese:</strong> 25%+ / 32%+</li>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                            Source: Hodgdon, J.A. &amp; Beckett, M.B. (1984). &quot;Prediction of percent body fat for U.S. Navy men and women
                            from body circumferences and height.&quot; Naval Health Research Center, Report No. 84-29.
                        </Typography>
                    </Paper>
                </Box>
            </TabPanel>

            <TabPanel value={tab} index={3}>
                <MacroCalculator />
                <Box sx={{ mt: 6, maxWidth: 700, mx: 'auto' }}>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: 'background.default' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Scientific Reference
                        </Typography>
                        <Typography paragraph color="text.secondary">
                            Macronutrient distribution is based on established nutritional science.
                            Each macronutrient provides a specific caloric value per gram.
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            Caloric Values
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <li><strong>Protein:</strong> 4 calories per gram</li>
                            <li><strong>Carbohydrates:</strong> 4 calories per gram</li>
                            <li><strong>Fat:</strong> 9 calories per gram</li>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            Recommended Protein Intake
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <li><strong>Sedentary adults:</strong> 0.8 g/kg body weight/day (RDA minimum)</li>
                            <li><strong>Active individuals:</strong> 1.2–1.7 g/kg/day</li>
                            <li><strong>Muscle gain:</strong> 1.6–2.2 g/kg/day</li>
                            <li><strong>Fat loss (preserving muscle):</strong> 1.8–2.7 g/kg/day</li>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            Goal-Based Calorie Adjustments
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <li><strong>Weight loss:</strong> 80% of TDEE (moderate deficit of ~500 cal/day)</li>
                            <li><strong>Maintenance:</strong> 100% of TDEE</li>
                            <li><strong>Lean bulk:</strong> 110% of TDEE (surplus of ~250 cal/day)</li>
                            <li><strong>Aggressive bulk:</strong> 120% of TDEE (surplus of ~500 cal/day)</li>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                            Sources: ISSN Position Stand on Protein (Jäger et al., 2017); Dietary Reference Intakes, National Academies Press.
                        </Typography>
                    </Paper>
                </Box>
            </TabPanel>

            <TabPanel value={tab} index={4}>
                <OneRepMaxCalculator />
                <Box sx={{ mt: 6, maxWidth: 700, mx: 'auto' }}>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: 'background.default' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Scientific Reference
                        </Typography>
                        <Typography paragraph color="text.secondary">
                            This calculator uses three established formulas and averages them for a more accurate estimate.
                            These formulas are most accurate for rep ranges of 2–10.
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            The Formulas
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <Typography component="li" paragraph>
                                <strong>Epley (1985):</strong> 1RM = weight × (1 + reps ÷ 30)
                            </Typography>
                            <Typography component="li" paragraph>
                                <strong>Brzycki (1993):</strong> 1RM = weight × 36 ÷ (37 − reps)
                            </Typography>
                            <Typography component="li" paragraph>
                                <strong>Lombardi (1989):</strong> 1RM = weight × reps<sup>0.10</sup>
                            </Typography>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            Training Zones
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <li><strong>Strength (1–5 reps):</strong> 85–100% of 1RM</li>
                            <li><strong>Hypertrophy (6–12 reps):</strong> 65–85% of 1RM</li>
                            <li><strong>Endurance (13–20+ reps):</strong> 50–65% of 1RM</li>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                            Sources: Epley, B. (1985). &quot;Poundage Chart.&quot; Boyd Epley Workout; Brzycki, M. (1993). &quot;Strength Testing—Predicting
                            a One-Rep Max from Reps-to-Fatigue.&quot; JOPERD 64(1):88–90.
                        </Typography>
                    </Paper>
                </Box>
            </TabPanel>

            <TabPanel value={tab} index={5}>
                <IdealWeightCalculator />
                <Box sx={{ mt: 6, maxWidth: 700, mx: 'auto' }}>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: 'background.default' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Scientific Reference
                        </Typography>
                        <Typography paragraph color="text.secondary">
                            This calculator compares four widely-used ideal body weight formulas. All use height
                            as the primary input and calculate weight based on inches above 5 feet (60 inches).
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontSize: '1.1rem' }}>
                            The Formulas (Men / Women)
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                            <Typography component="li" paragraph>
                                <strong>Devine (1974):</strong> 50 + 2.3 × (inches over 60) / 45.5 + 2.3 × (inches over 60)
                            </Typography>
                            <Typography component="li" paragraph>
                                <strong>Robinson (1983):</strong> 52 + 1.9 × (inches over 60) / 49 + 1.7 × (inches over 60)
                            </Typography>
                            <Typography component="li" paragraph>
                                <strong>Miller (1983):</strong> 56.2 + 1.41 × (inches over 60) / 53.1 + 1.36 × (inches over 60)
                            </Typography>
                            <Typography component="li" paragraph>
                                <strong>Hamwi (1964):</strong> 48 + 2.7 × (inches over 60) / 45.5 + 2.2 × (inches over 60)
                            </Typography>
                        </Box>
                        <Typography paragraph color="text.secondary" sx={{ mt: 2 }}>
                            All results are in kilograms. These formulas were originally designed for medication dosing
                            and provide general guidelines. Individual ideal weight depends on body composition, frame size,
                            and overall health.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            Sources: Devine, B.J. (1974). Pharm Clin N Am; Robinson, J.D. et al. (1983). Am J Emerg Med;
                            Miller, D.R. et al. (1983). Anesthesiology; Hamwi, G.J. (1964). ADA Forecasting.
                        </Typography>
                    </Paper>
                </Box>
            </TabPanel>
        </Box>
    );
}
