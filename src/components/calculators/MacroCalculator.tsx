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
import Chip from '@mui/material/Chip';

const GOALS = [
    { value: 'lose', label: 'Lose Weight', multiplier: 0.8 },
    { value: 'maintain', label: 'Maintain Weight', multiplier: 1.0 },
    { value: 'gain', label: 'Lean Bulk', multiplier: 1.1 },
    { value: 'bulk', label: 'Aggressive Bulk', multiplier: 1.2 },
];

interface DietPreset {
    name: string;
    proteinPct: number;
    carbsPct: number;
    fatPct: number;
    description: string;
}

const DIET_PRESETS: DietPreset[] = [
    { name: 'Balanced', proteinPct: 30, carbsPct: 40, fatPct: 30, description: 'Classic balanced split' },
    { name: 'High Protein', proteinPct: 40, carbsPct: 30, fatPct: 30, description: 'Muscle building focused' },
    { name: 'Low Carb', proteinPct: 35, carbsPct: 20, fatPct: 45, description: 'Reduced carbohydrates' },
    { name: 'Keto', proteinPct: 25, carbsPct: 5, fatPct: 70, description: 'Very low carb, high fat' },
    { name: 'Zone (40/30/30)', proteinPct: 30, carbsPct: 40, fatPct: 30, description: 'Zone diet ratios' },
];

export default function MacroCalculator() {
    const [calories, setCalories] = React.useState('');
    const [goal, setGoal] = React.useState('maintain');
    const [selectedPreset, setSelectedPreset] = React.useState(0);
    const [weightVal, setWeightVal] = React.useState('');
    const [weightUnit, setWeightUnit] = React.useState<'kg' | 'lbs'>('lbs');
    const [result, setResult] = React.useState<{
        targetCalories: number;
        protein: number;
        carbs: number;
        fat: number;
        proteinCal: number;
        carbsCal: number;
        fatCal: number;
    } | null>(null);

    const calculate = () => {
        const cal = parseFloat(calories);
        if (!cal || cal < 500) {
            alert('Please enter your daily calories (TDEE). Use the TDEE Calculator tab if you don\'t know yours.');
            return;
        }

        const goalMultiplier = GOALS.find((g) => g.value === goal)?.multiplier ?? 1;
        const targetCalories = Math.round(cal * goalMultiplier);
        const preset = DIET_PRESETS[selectedPreset];

        const proteinCal = Math.round(targetCalories * (preset.proteinPct / 100));
        const carbsCal = Math.round(targetCalories * (preset.carbsPct / 100));
        const fatCal = Math.round(targetCalories * (preset.fatPct / 100));

        setResult({
            targetCalories,
            protein: Math.round(proteinCal / 4), // 4 cal per gram
            carbs: Math.round(carbsCal / 4),
            fat: Math.round(fatCal / 9), // 9 cal per gram
            proteinCal,
            carbsCal,
            fatCal,
        });
    };

    const preset = DIET_PRESETS[selectedPreset];

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
            <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                    <Stack spacing={3}>
                        {/* Calories input */}
                        <TextField
                            label="Daily Calories (TDEE)"
                            type="number"
                            fullWidth
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cal/day</InputAdornment>,
                            }}
                            helperText="Use the TDEE Calculator tab if you don't know your maintenance calories"
                        />

                        <Divider />

                        {/* Goal */}
                        <TextField select label="Goal" fullWidth value={goal} onChange={(e) => setGoal(e.target.value)}>
                            {GOALS.map((g) => (
                                <MenuItem key={g.value} value={g.value}>
                                    {g.label} ({g.multiplier === 1 ? '100%' : `${Math.round(g.multiplier * 100)}%`} of TDEE)
                                </MenuItem>
                            ))}
                        </TextField>

                        <Divider />

                        {/* Diet Preset Selection */}
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Diet Style
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {DIET_PRESETS.map((p, i) => (
                                    <Chip
                                        key={p.name}
                                        label={p.name}
                                        onClick={() => setSelectedPreset(i)}
                                        color={i === selectedPreset ? 'primary' : 'default'}
                                        variant={i === selectedPreset ? 'filled' : 'outlined'}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                ))}
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {preset.description} — Protein {preset.proteinPct}% / Carbs {preset.carbsPct}% / Fat {preset.fatPct}%
                            </Typography>
                        </Box>

                        {/* Optional weight */}
                        <Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <TextField
                                    label="Body Weight (optional)"
                                    type="number"
                                    fullWidth
                                    value={weightVal}
                                    onChange={(e) => setWeightVal(e.target.value)}
                                    InputProps={{ endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment> }}
                                />
                                <ToggleButtonGroup color="primary" value={weightUnit} exclusive onChange={(_, v) => v && setWeightUnit(v)} sx={{ minWidth: 140, height: 56 }}>
                                    <ToggleButton value="kg">Kg</ToggleButton>
                                    <ToggleButton value="lbs">Lbs</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1.75, display: 'block' }}>
                                For protein per bodyweight ratio
                            </Typography>
                        </Box>

                        <Button variant="contained" size="large" fullWidth onClick={calculate} sx={{ py: 1.5, fontSize: '1.1rem' }}>
                            Calculate Macros
                        </Button>
                    </Stack>

                    {result && (
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Divider sx={{ mb: 4 }} />
                            <Typography variant="h5" color="primary" gutterBottom>
                                Your Daily Macros
                            </Typography>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Target: {result.targetCalories} cal/day
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
                                {/* Protein */}
                                <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2, minWidth: 160, flex: 1 }}>
                                    <Typography variant="subtitle2" color="text.secondary">Protein</Typography>
                                    <Typography variant="h4" fontWeight="bold" color="#1565c0">{result.protein}g</Typography>
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        {result.proteinCal} cal ({preset.proteinPct}%)
                                    </Typography>
                                </Box>

                                {/* Carbs */}
                                <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 2, minWidth: 160, flex: 1 }}>
                                    <Typography variant="subtitle2" color="text.secondary">Carbs</Typography>
                                    <Typography variant="h4" fontWeight="bold" color="#e65100">{result.carbs}g</Typography>
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        {result.carbsCal} cal ({preset.carbsPct}%)
                                    </Typography>
                                </Box>

                                {/* Fat */}
                                <Box sx={{ p: 2, bgcolor: '#fce4ec', borderRadius: 2, minWidth: 160, flex: 1 }}>
                                    <Typography variant="subtitle2" color="text.secondary">Fat</Typography>
                                    <Typography variant="h4" fontWeight="bold" color="#c62828">{result.fat}g</Typography>
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        {result.fatCal} cal ({preset.fatPct}%)
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Macro bar */}
                            <Box sx={{ mt: 3, display: 'flex', height: 12, borderRadius: 2, overflow: 'hidden' }}>
                                <Box sx={{ width: `${preset.proteinPct}%`, bgcolor: '#1565c0' }} />
                                <Box sx={{ width: `${preset.carbsPct}%`, bgcolor: '#e65100' }} />
                                <Box sx={{ width: `${preset.fatPct}%`, bgcolor: '#c62828' }} />
                            </Box>

                            {/* Protein per bodyweight */}
                            {weightVal && parseFloat(weightVal) > 0 && (
                                <Box sx={{ mt: 3, bgcolor: 'action.hover', p: 2, borderRadius: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Protein per bodyweight:{' '}
                                        <strong>
                                            {(result.protein / (weightUnit === 'lbs' ? parseFloat(weightVal) * 0.453592 : parseFloat(weightVal))).toFixed(1)} g/kg
                                        </strong>
                                        {' '}
                                        ({(result.protein / (weightUnit === 'lbs' ? parseFloat(weightVal) : parseFloat(weightVal) * 2.20462)).toFixed(1)} g/lb)
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
