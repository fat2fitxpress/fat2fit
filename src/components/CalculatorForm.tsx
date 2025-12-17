'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

const ACTIVITY_LEVELS = [
    { value: 1.2, label: 'Sedentary (little or no exercise)' },
    { value: 1.375, label: 'Lightly active (light exercise 1-3 days/week)' },
    { value: 1.55, label: 'Moderately active (moderate exercise 3-5 days/week)' },
    { value: 1.725, label: 'Active (head exercise 6-7 days/week)' },
    { value: 1.9, label: 'Very active (hard exercise & physical job)' },
];

export default function CalculatorForm() {
    const [weightUnit, setWeightUnit] = React.useState<'kg' | 'lbs'>('kg');
    const [heightUnit, setHeightUnit] = React.useState<'cm' | 'ft'>('ft');

    const [gender, setGender] = React.useState('male');
    const [age, setAge] = React.useState('');
    const [weight, setWeight] = React.useState('');

    const [heightCm, setHeightCm] = React.useState('');
    const [heightFt, setHeightFt] = React.useState('');
    const [heightIn, setHeightIn] = React.useState('');

    const [activity, setActivity] = React.useState(1.2);
    const [result, setResult] = React.useState<{ bmr: number; tdee: number } | null>(null);

    const calculate = () => {
        const ageNum = parseFloat(age);
        let weightKg = 0;
        let finalHeightCm = 0;

        // Weight Conversion
        if (weightUnit === 'kg') {
            weightKg = parseFloat(weight);
        } else {
            weightKg = parseFloat(weight) * 0.453592;
        }

        // Height Conversion
        if (heightUnit === 'cm') {
            finalHeightCm = parseFloat(heightCm);
        } else {
            const ft = parseFloat(heightFt) || 0;
            const inch = parseFloat(heightIn) || 0;
            finalHeightCm = (ft * 12 + inch) * 2.54;
        }

        if (!ageNum || !weightKg || !finalHeightCm) {
            alert('Please fill in all required fields.');
            return;
        }

        // Mifflin-St Jeor Equation
        let bmr = 10 * weightKg + 6.25 * finalHeightCm - 5 * ageNum;
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        const tdee = bmr * activity;

        setResult({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
        });
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
            <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                    <Stack spacing={3}>
                        {/* Gender and Age Row */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                select
                                label="Gender"
                                fullWidth
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </TextField>
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </Box>

                        <Divider />

                        {/* Weight Input Row */}
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
                                onChange={(e, val) => val && setWeightUnit(val)}
                                sx={{ minWidth: 140, height: 56 }}
                            >
                                <ToggleButton value="kg">Kg</ToggleButton>
                                <ToggleButton value="lbs">Lbs</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        {/* Height Input Row */}
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
                                    <TextField
                                        label="Feet"
                                        type="number"
                                        fullWidth
                                        value={heightFt}
                                        onChange={(e) => setHeightFt(e.target.value)}
                                    />
                                    <TextField
                                        label="Inches"
                                        type="number"
                                        fullWidth
                                        value={heightIn}
                                        onChange={(e) => setHeightIn(e.target.value)}
                                    />
                                </Box>
                            )}
                            <ToggleButtonGroup
                                color="primary"
                                value={heightUnit}
                                exclusive
                                onChange={(e, val) => val && setHeightUnit(val)}
                                sx={{ minWidth: 140, height: 56 }}
                            >
                                <ToggleButton value="cm">Cm</ToggleButton>
                                <ToggleButton value="ft">Ft/In</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Divider />

                        {/* Activity Level */}
                        <TextField
                            select
                            label="Activity Level"
                            fullWidth
                            value={activity}
                            onChange={(e) => setActivity(Number(e.target.value))}
                        >
                            {ACTIVITY_LEVELS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={calculate}
                            sx={{ py: 1.5, fontSize: '1.1rem' }}
                        >
                            Calculate Calories
                        </Button>
                    </Stack>

                    {/* Results Display */}
                    {result && (
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Divider sx={{ mb: 4 }} />
                            <Typography variant="h5" color="primary" gutterBottom>
                                Your Results
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, minWidth: 250 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Basal Metabolic Rate (BMR)
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold">
                                        {result.bmr}
                                    </Typography>
                                    <Typography variant="caption" display="block">
                                        Calories/day (at rest)
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        minWidth: 250,
                                    }}
                                >
                                    <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                                        Maintenance Calories
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold">
                                        {result.tdee}
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>
                                        Calories/day (to maintain weight)
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
