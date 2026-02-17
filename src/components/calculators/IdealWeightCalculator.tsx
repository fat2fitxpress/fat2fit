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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface FormulaResult {
    name: string;
    weightKg: number;
    weightLbs: number;
    description: string;
}

export default function IdealWeightCalculator() {
    const [gender, setGender] = React.useState('male');
    const [heightUnit, setHeightUnit] = React.useState<'cm' | 'ft'>('ft');
    const [heightCm, setHeightCm] = React.useState('');
    const [heightFt, setHeightFt] = React.useState('');
    const [heightIn, setHeightIn] = React.useState('');
    const [result, setResult] = React.useState<{ formulas: FormulaResult[]; average: number; averageLbs: number; heightInches: number } | null>(null);

    const calculate = () => {
        let totalInches: number;
        if (heightUnit === 'cm') {
            totalInches = parseFloat(heightCm) / 2.54;
        } else {
            const ft = parseFloat(heightFt) || 0;
            const inch = parseFloat(heightIn) || 0;
            totalInches = ft * 12 + inch;
        }

        if (!totalInches || totalInches < 48) {
            alert('Please enter a valid height (minimum 4 feet / 122 cm).');
            return;
        }

        // All formulas use inches over 5 feet (60 inches)
        const inchesOver5ft = Math.max(0, totalInches - 60);

        const formulas: FormulaResult[] = [];

        // Devine (1974)
        if (gender === 'male') {
            const kg = 50 + 2.3 * inchesOver5ft;
            formulas.push({ name: 'Devine', weightKg: Math.round(kg * 10) / 10, weightLbs: Math.round(kg * 2.20462), description: 'Most widely used clinical formula' });
        } else {
            const kg = 45.5 + 2.3 * inchesOver5ft;
            formulas.push({ name: 'Devine', weightKg: Math.round(kg * 10) / 10, weightLbs: Math.round(kg * 2.20462), description: 'Most widely used clinical formula' });
        }

        // Robinson (1983)
        if (gender === 'male') {
            const kg = 52 + 1.9 * inchesOver5ft;
            formulas.push({ name: 'Robinson', weightKg: Math.round(kg * 10) / 10, weightLbs: Math.round(kg * 2.20462), description: 'Modified Devine, more conservative' });
        } else {
            const kg = 49 + 1.7 * inchesOver5ft;
            formulas.push({ name: 'Robinson', weightKg: Math.round(kg * 10) / 10, weightLbs: Math.round(kg * 2.20462), description: 'Modified Devine, more conservative' });
        }

        // Miller (1983)
        if (gender === 'male') {
            const kg = 56.2 + 1.41 * inchesOver5ft;
            formulas.push({ name: 'Miller', weightKg: Math.round(kg * 10) / 10, weightLbs: Math.round(kg * 2.20462), description: 'Higher baseline, smaller increments' });
        } else {
            const kg = 53.1 + 1.36 * inchesOver5ft;
            formulas.push({ name: 'Miller', weightKg: Math.round(kg * 10) / 10, weightLbs: Math.round(kg * 2.20462), description: 'Higher baseline, smaller increments' });
        }

        // Hamwi (1964)
        if (gender === 'male') {
            const kg = 48 + 2.7 * inchesOver5ft;
            formulas.push({ name: 'Hamwi', weightKg: Math.round(kg * 10) / 10, weightLbs: Math.round(kg * 2.20462), description: 'Classic formula, oldest of the four' });
        } else {
            const kg = 45.5 + 2.2 * inchesOver5ft;
            formulas.push({ name: 'Hamwi', weightKg: Math.round(kg * 10) / 10, weightLbs: Math.round(kg * 2.20462), description: 'Classic formula, oldest of the four' });
        }

        const avgKg = formulas.reduce((sum, f) => sum + f.weightKg, 0) / formulas.length;
        const avgLbs = formulas.reduce((sum, f) => sum + f.weightLbs, 0) / formulas.length;

        setResult({
            formulas,
            average: Math.round(avgKg * 10) / 10,
            averageLbs: Math.round(avgLbs),
            heightInches: totalInches,
        });
    };

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

                        {/* Height */}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {heightUnit === 'cm' ? (
                                <TextField
                                    label="Height"
                                    type="number"
                                    fullWidth
                                    value={heightCm}
                                    onChange={(e) => setHeightCm(e.target.value)}
                                    InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }}
                                />
                            ) : (
                                <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                                    <TextField label="Feet" type="number" fullWidth value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
                                    <TextField label="Inches" type="number" fullWidth value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
                                </Box>
                            )}
                            <ToggleButtonGroup color="primary" value={heightUnit} exclusive onChange={(_, v) => v && setHeightUnit(v)} sx={{ minWidth: 140, height: 56 }}>
                                <ToggleButton value="cm">Cm</ToggleButton>
                                <ToggleButton value="ft">Ft/In</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Button variant="contained" size="large" fullWidth onClick={calculate} sx={{ py: 1.5, fontSize: '1.1rem' }}>
                            Calculate Ideal Weight
                        </Button>
                    </Stack>

                    {result && (
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Divider sx={{ mb: 4 }} />
                            <Typography variant="h5" color="primary" gutterBottom>
                                Your Ideal Weight Range
                            </Typography>

                            {/* Average result */}
                            <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 2, display: 'inline-block', mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Average Ideal Weight</Typography>
                                <Typography variant="h3" fontWeight="bold">
                                    {result.average} kg
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    ({result.averageLbs} lbs)
                                </Typography>
                            </Box>

                            {/* Range visualization */}
                            <Box sx={{ mb: 3, px: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {Math.min(...result.formulas.map((f) => f.weightKg))} kg
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {Math.max(...result.formulas.map((f) => f.weightKg))} kg
                                    </Typography>
                                </Box>
                                <Box sx={{ height: 12, borderRadius: 2, background: 'linear-gradient(90deg, #42a5f5, #66bb6a, #42a5f5)', opacity: 0.8 }} />
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                    Healthy range based on 4 formulas
                                </Typography>
                            </Box>

                            {/* Formula comparison table */}
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Formula</strong></TableCell>
                                            <TableCell align="center"><strong>Weight (kg)</strong></TableCell>
                                            <TableCell align="center"><strong>Weight (lbs)</strong></TableCell>
                                            <TableCell align="right"><strong>Notes</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {result.formulas.map((f) => (
                                            <TableRow key={f.name}>
                                                <TableCell><strong>{f.name}</strong></TableCell>
                                                <TableCell align="center">{f.weightKg}</TableCell>
                                                <TableCell align="center">{f.weightLbs}</TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="caption" color="text.secondary">{f.description}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ mt: 3, textAlign: 'left', bgcolor: 'action.hover', p: 2, borderRadius: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Note:</strong> These formulas provide general estimates based on height and gender.
                                    They do not account for body composition, muscle mass, or frame size.
                                    A healthy weight varies between individuals — consult a healthcare professional for personalized advice.
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
