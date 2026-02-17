'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const BODY_FAT_CATEGORIES_MALE = [
    { label: 'Essential Fat', min: 0, max: 6, color: '#42a5f5' },
    { label: 'Athletes', min: 6, max: 14, color: '#66bb6a' },
    { label: 'Fitness', min: 14, max: 18, color: '#8bc34a' },
    { label: 'Average', min: 18, max: 25, color: '#ffa726' },
    { label: 'Obese', min: 25, max: 100, color: '#ef5350' },
];

const BODY_FAT_CATEGORIES_FEMALE = [
    { label: 'Essential Fat', min: 0, max: 14, color: '#42a5f5' },
    { label: 'Athletes', min: 14, max: 21, color: '#66bb6a' },
    { label: 'Fitness', min: 21, max: 25, color: '#8bc34a' },
    { label: 'Average', min: 25, max: 32, color: '#ffa726' },
    { label: 'Obese', min: 32, max: 100, color: '#ef5350' },
];

function getCategory(bf: number, gender: string) {
    const cats = gender === 'male' ? BODY_FAT_CATEGORIES_MALE : BODY_FAT_CATEGORIES_FEMALE;
    return cats.find((c) => bf >= c.min && bf < c.max) ?? cats[cats.length - 1];
}

export default function BodyFatCalculator() {
    const [unit, setUnit] = React.useState<'cm' | 'in'>('in');
    const [gender, setGender] = React.useState('male');
    const [waist, setWaist] = React.useState('');
    const [neck, setNeck] = React.useState('');
    const [hip, setHip] = React.useState('');
    const [heightVal, setHeightVal] = React.useState('');
    const [result, setResult] = React.useState<{ bf: number; category: string; color: string; leanMass: number; fatMass: number } | null>(null);
    const [weightForMass, setWeightForMass] = React.useState('');
    const [weightUnit, setWeightUnit] = React.useState<'kg' | 'lbs'>('lbs');

    const calculate = () => {
        // Convert all to cm for the US Navy formula
        const toCm = unit === 'in' ? 2.54 : 1;
        const waistCm = parseFloat(waist) * toCm;
        const neckCm = parseFloat(neck) * toCm;
        const hipCm = parseFloat(hip) * toCm;
        const heightCm = parseFloat(heightVal) * toCm;

        if (!waistCm || !neckCm || !heightCm) {
            alert('Please fill in all required fields.');
            return;
        }
        if (gender === 'female' && !hipCm) {
            alert('Hip measurement is required for female calculation.');
            return;
        }

        let bf: number;
        if (gender === 'male') {
            // US Navy Male: 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76
            bf = 86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76;
        } else {
            // US Navy Female: 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387
            bf = 163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387;
        }

        bf = Math.max(0, Math.round(bf * 10) / 10);
        const cat = getCategory(bf, gender);

        let leanMass = 0;
        let fatMass = 0;
        const w = parseFloat(weightForMass);
        if (w) {
            const wKg = weightUnit === 'lbs' ? w * 0.453592 : w;
            fatMass = Math.round(wKg * (bf / 100) * 10) / 10;
            leanMass = Math.round((wKg - fatMass) * 10) / 10;
        }

        setResult({ bf, category: cat.label, color: cat.color, leanMass, fatMass });
    };

    const categories = gender === 'male' ? BODY_FAT_CATEGORIES_MALE : BODY_FAT_CATEGORIES_FEMALE;

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
            <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                    <Stack spacing={3}>
                        {/* Gender */}
                        <TextField select label="Gender" fullWidth value={gender} onChange={(e) => setGender(e.target.value)}>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </TextField>

                        <Divider />

                        {/* Measurement unit toggle */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <ToggleButtonGroup color="primary" value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small">
                                <ToggleButton value="in">Inches</ToggleButton>
                                <ToggleButton value="cm">Cm</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        {/* Measurements */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Height"
                                type="number"
                                fullWidth
                                value={heightVal}
                                onChange={(e) => setHeightVal(e.target.value)}
                                InputProps={{ endAdornment: <InputAdornment position="end">{unit}</InputAdornment> }}
                            />
                            <TextField
                                label="Neck"
                                type="number"
                                fullWidth
                                value={neck}
                                onChange={(e) => setNeck(e.target.value)}
                                InputProps={{ endAdornment: <InputAdornment position="end">{unit}</InputAdornment> }}
                                helperText="Around the narrowest point"
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Waist"
                                type="number"
                                fullWidth
                                value={waist}
                                onChange={(e) => setWaist(e.target.value)}
                                InputProps={{ endAdornment: <InputAdornment position="end">{unit}</InputAdornment> }}
                                helperText="At the navel level"
                            />
                            {gender === 'female' && (
                                <TextField
                                    label="Hip"
                                    type="number"
                                    fullWidth
                                    value={hip}
                                    onChange={(e) => setHip(e.target.value)}
                                    InputProps={{ endAdornment: <InputAdornment position="end">{unit}</InputAdornment> }}
                                    helperText="At the widest point"
                                />
                            )}
                        </Box>

                        <Divider />

                        {/* Optional weight for lean/fat mass */}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <TextField
                                label="Weight (optional, for mass breakdown)"
                                type="number"
                                fullWidth
                                value={weightForMass}
                                onChange={(e) => setWeightForMass(e.target.value)}
                                InputProps={{ endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment> }}
                            />
                            <ToggleButtonGroup color="primary" value={weightUnit} exclusive onChange={(_, v) => v && setWeightUnit(v)} sx={{ minWidth: 140, height: 56 }}>
                                <ToggleButton value="kg">Kg</ToggleButton>
                                <ToggleButton value="lbs">Lbs</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Button variant="contained" size="large" fullWidth onClick={calculate} sx={{ py: 1.5, fontSize: '1.1rem' }}>
                            Calculate Body Fat %
                        </Button>
                    </Stack>

                    {result && (
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Divider sx={{ mb: 4 }} />
                            <Typography variant="h5" color="primary" gutterBottom>
                                Your Body Fat Percentage
                            </Typography>
                            <Typography variant="h2" fontWeight="bold" sx={{ color: result.color }}>
                                {result.bf}%
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ mt: 1, px: 3, py: 0.5, display: 'inline-block', borderRadius: 2, bgcolor: result.color, color: '#fff' }}
                            >
                                {result.category}
                            </Typography>

                            {/* Category gauge */}
                            <Box sx={{ mt: 4, px: 2 }}>
                                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                                    {categories.map((cat) => (
                                        <Box
                                            key={cat.label}
                                            sx={{ flex: 1, height: 8, borderRadius: 1, bgcolor: cat.color, opacity: cat.label === result.category ? 1 : 0.3 }}
                                        />
                                    ))}
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {categories.map((cat) => (
                                        <Typography key={cat.label} variant="caption" color="text.secondary">{cat.label}</Typography>
                                    ))}
                                </Box>
                            </Box>

                            {/* Mass breakdown */}
                            {result.leanMass > 0 && (
                                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, minWidth: 180 }}>
                                        <Typography variant="subtitle2" color="text.secondary">Lean Mass</Typography>
                                        <Typography variant="h5" fontWeight="bold">{result.leanMass} kg</Typography>
                                    </Box>
                                    <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, minWidth: 180 }}>
                                        <Typography variant="subtitle2" color="text.secondary">Fat Mass</Typography>
                                        <Typography variant="h5" fontWeight="bold">{result.fatMass} kg</Typography>
                                    </Box>
                                </Box>
                            )}

                            <Box sx={{ mt: 3, textAlign: 'left', bgcolor: 'action.hover', p: 2, borderRadius: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>US Navy Method:</strong> This estimates body fat using circumference measurements.
                                    For more accuracy, consider DEXA scans or hydrostatic weighing.
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
