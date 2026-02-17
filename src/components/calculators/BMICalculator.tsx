'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LinearProgress from '@mui/material/LinearProgress';

const BMI_CATEGORIES = [
    { label: 'Underweight', min: 0, max: 18.5, color: '#42a5f5' },
    { label: 'Normal', min: 18.5, max: 25, color: '#66bb6a' },
    { label: 'Overweight', min: 25, max: 30, color: '#ffa726' },
    { label: 'Obese I', min: 30, max: 35, color: '#ef5350' },
    { label: 'Obese II', min: 35, max: 40, color: '#d32f2f' },
    { label: 'Obese III', min: 40, max: 100, color: '#b71c1c' },
];

function getCategory(bmi: number) {
    return BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) ?? BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
}

export default function BMICalculator() {
    const [weightUnit, setWeightUnit] = React.useState<'kg' | 'lbs'>('kg');
    const [heightUnit, setHeightUnit] = React.useState<'cm' | 'ft'>('ft');
    const [weight, setWeight] = React.useState('');
    const [heightCm, setHeightCm] = React.useState('');
    const [heightFt, setHeightFt] = React.useState('');
    const [heightIn, setHeightIn] = React.useState('');
    const [result, setResult] = React.useState<{ bmi: number; category: string; color: string } | null>(null);

    const calculate = () => {
        let weightKg = parseFloat(weight);
        if (weightUnit === 'lbs') weightKg *= 0.453592;

        let heightM: number;
        if (heightUnit === 'cm') {
            heightM = parseFloat(heightCm) / 100;
        } else {
            const ft = parseFloat(heightFt) || 0;
            const inch = parseFloat(heightIn) || 0;
            heightM = (ft * 12 + inch) * 0.0254;
        }

        if (!weightKg || !heightM) {
            alert('Please fill in all fields.');
            return;
        }

        const bmi = weightKg / (heightM * heightM);
        const cat = getCategory(bmi);
        setResult({ bmi: Math.round(bmi * 10) / 10, category: cat.label, color: cat.color });
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
            <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                    <Stack spacing={3}>
                        {/* Weight */}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <TextField
                                label="Weight"
                                type="number"
                                fullWidth
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment>,
                                }}
                            />
                            <ToggleButtonGroup
                                color="primary"
                                value={weightUnit}
                                exclusive
                                onChange={(_, val) => val && setWeightUnit(val)}
                                sx={{ minWidth: 140, height: 56 }}
                            >
                                <ToggleButton value="kg">Kg</ToggleButton>
                                <ToggleButton value="lbs">Lbs</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        {/* Height */}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {heightUnit === 'cm' ? (
                                <TextField
                                    label="Height"
                                    type="number"
                                    fullWidth
                                    value={heightCm}
                                    onChange={(e) => setHeightCm(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}
                                />
                            ) : (
                                <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                                    <TextField label="Feet" type="number" fullWidth value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
                                    <TextField label="Inches" type="number" fullWidth value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
                                </Box>
                            )}
                            <ToggleButtonGroup
                                color="primary"
                                value={heightUnit}
                                exclusive
                                onChange={(_, val) => val && setHeightUnit(val)}
                                sx={{ minWidth: 140, height: 56 }}
                            >
                                <ToggleButton value="cm">Cm</ToggleButton>
                                <ToggleButton value="ft">Ft/In</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Button variant="contained" size="large" fullWidth onClick={calculate} sx={{ py: 1.5, fontSize: '1.1rem' }}>
                            Calculate BMI
                        </Button>
                    </Stack>

                    {result && (
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Divider sx={{ mb: 4 }} />
                            <Typography variant="h5" color="primary" gutterBottom>
                                Your BMI
                            </Typography>
                            <Typography variant="h2" fontWeight="bold" sx={{ color: result.color }}>
                                {result.bmi}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 1,
                                    px: 3,
                                    py: 0.5,
                                    display: 'inline-block',
                                    borderRadius: 2,
                                    bgcolor: result.color,
                                    color: '#fff',
                                }}
                            >
                                {result.category}
                            </Typography>

                            {/* Visual gauge */}
                            <Box sx={{ mt: 4, px: 2 }}>
                                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                                    {BMI_CATEGORIES.map((cat) => (
                                        <Box
                                            key={cat.label}
                                            sx={{
                                                flex: 1,
                                                height: 8,
                                                borderRadius: 1,
                                                bgcolor: cat.color,
                                                opacity: cat.label === result.category ? 1 : 0.3,
                                            }}
                                        />
                                    ))}
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="caption" color="text.secondary">16</Typography>
                                    <Typography variant="caption" color="text.secondary">18.5</Typography>
                                    <Typography variant="caption" color="text.secondary">25</Typography>
                                    <Typography variant="caption" color="text.secondary">30</Typography>
                                    <Typography variant="caption" color="text.secondary">35</Typography>
                                    <Typography variant="caption" color="text.secondary">40+</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 3, textAlign: 'left', bgcolor: 'action.hover', p: 2, borderRadius: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Note:</strong> BMI is a screening tool and does not directly measure body fat.
                                    Athletes and muscular individuals may have a high BMI without excess fat.
                                    Consult a healthcare professional for a complete health assessment.
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
