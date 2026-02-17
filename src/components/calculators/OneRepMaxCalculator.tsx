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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const PERCENTAGES = [100, 95, 90, 85, 80, 75, 70, 65, 60];
const REP_RANGES: Record<number, string> = {
    100: '1 rep',
    95: '2 reps',
    90: '3-4 reps',
    85: '5-6 reps',
    80: '7-8 reps',
    75: '9-10 reps',
    70: '11-12 reps',
    65: '13-15 reps',
    60: '16-20 reps',
};

export default function OneRepMaxCalculator() {
    const [weightUnit, setWeightUnit] = React.useState<'kg' | 'lbs'>('lbs');
    const [weight, setWeight] = React.useState('');
    const [reps, setReps] = React.useState('');
    const [result, setResult] = React.useState<{
        oneRM: number;
        epley: number;
        brzycki: number;
        lombardi: number;
        table: { pct: number; weight: number; reps: string }[];
    } | null>(null);

    const calculate = () => {
        const w = parseFloat(weight);
        const r = parseInt(reps, 10);

        if (!w || !r || r < 1) {
            alert('Please enter the weight lifted and number of reps (at least 1).');
            return;
        }

        if (r === 1) {
            // If they did 1 rep, that IS their 1RM
            const table = PERCENTAGES.map((pct) => ({
                pct,
                weight: Math.round(w * (pct / 100)),
                reps: REP_RANGES[pct],
            }));
            setResult({ oneRM: w, epley: w, brzycki: w, lombardi: w, table });
            return;
        }

        // Epley: weight × (1 + reps/30)
        const epley = w * (1 + r / 30);
        // Brzycki: weight × 36 / (37 - reps)
        const brzycki = r < 37 ? (w * 36) / (37 - r) : epley;
        // Lombardi: weight × reps^0.10
        const lombardi = w * Math.pow(r, 0.1);

        const oneRM = Math.round((epley + brzycki + lombardi) / 3);

        const table = PERCENTAGES.map((pct) => ({
            pct,
            weight: Math.round(oneRM * (pct / 100)),
            reps: REP_RANGES[pct],
        }));

        setResult({
            oneRM,
            epley: Math.round(epley),
            brzycki: Math.round(brzycki),
            lombardi: Math.round(lombardi),
            table,
        });
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
            <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                    <Stack spacing={3}>
                        {/* Weight & Reps */}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <TextField
                                label="Weight Lifted"
                                type="number"
                                fullWidth
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                InputProps={{ endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment> }}
                            />
                            <ToggleButtonGroup
                                color="primary"
                                value={weightUnit}
                                exclusive
                                onChange={(_, v) => v && setWeightUnit(v)}
                                sx={{ minWidth: 140, height: 56 }}
                            >
                                <ToggleButton value="kg">Kg</ToggleButton>
                                <ToggleButton value="lbs">Lbs</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <TextField
                            label="Reps Performed"
                            type="number"
                            fullWidth
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            helperText="How many reps did you complete with this weight?"
                        />

                        <Button variant="contained" size="large" fullWidth onClick={calculate} sx={{ py: 1.5, fontSize: '1.1rem' }}>
                            Calculate One Rep Max
                        </Button>
                    </Stack>

                    {result && (
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Divider sx={{ mb: 4 }} />
                            <Typography variant="h5" color="primary" gutterBottom>
                                Estimated One Rep Max
                            </Typography>
                            <Typography variant="h2" fontWeight="bold" color="primary.main">
                                {result.oneRM} {weightUnit}
                            </Typography>

                            {/* Formula comparison */}
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
                                <Box sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 2, minWidth: 120 }}>
                                    <Typography variant="caption" color="text.secondary">Epley</Typography>
                                    <Typography variant="h6" fontWeight="bold">{result.epley} {weightUnit}</Typography>
                                </Box>
                                <Box sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 2, minWidth: 120 }}>
                                    <Typography variant="caption" color="text.secondary">Brzycki</Typography>
                                    <Typography variant="h6" fontWeight="bold">{result.brzycki} {weightUnit}</Typography>
                                </Box>
                                <Box sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 2, minWidth: 120 }}>
                                    <Typography variant="caption" color="text.secondary">Lombardi</Typography>
                                    <Typography variant="h6" fontWeight="bold">{result.lombardi} {weightUnit}</Typography>
                                </Box>
                            </Box>

                            {/* Percentage table */}
                            <TableContainer sx={{ mt: 4 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>% of 1RM</strong></TableCell>
                                            <TableCell align="center"><strong>Weight ({weightUnit})</strong></TableCell>
                                            <TableCell align="right"><strong>Est. Reps</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {result.table.map((row) => (
                                            <TableRow
                                                key={row.pct}
                                                sx={{
                                                    bgcolor: row.pct === 100 ? 'primary.main' : 'transparent',
                                                    '& td': row.pct === 100 ? { color: 'primary.contrastText', fontWeight: 'bold' } : {},
                                                }}
                                            >
                                                <TableCell>{row.pct}%</TableCell>
                                                <TableCell align="center">{row.weight}</TableCell>
                                                <TableCell align="right">{row.reps}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ mt: 3, textAlign: 'left', bgcolor: 'action.hover', p: 2, borderRadius: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Tip:</strong> The estimate is most accurate with 2-10 reps. Higher rep ranges (15+) tend to overestimate.
                                    Always use a spotter when attempting heavy lifts near your max.
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
