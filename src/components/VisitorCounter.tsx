'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function VisitorCounter() {
    const [visits, setVisits] = React.useState<number | null>(null);

    React.useEffect(() => {
        // We ping the free public counter API. Every ping returns the incremented count.
        fetch('https://api.counterapi.dev/v1/fat2fitxpress/visits/up')
            .then((res) => {
                if (!res.ok) throw new Error('Counter API error');
                return res.json();
            })
            .then((data) => {
                if (data && typeof data.count === 'number') {
                    // Add 1000 base count to start with traction
                    setVisits(data.count + 1000);
                }
            })
            .catch((err) => {
                console.error('Failed to fetch visitor count:', err);
                // Graceful fallback if API is blocked by adblockers or offline
                setVisits(1042);
            });
    }, []);

    // Return empty placeholder while loading to prevent layout shift
    if (visits === null) {
        return <Box sx={{ display: 'flex', height: 40, mt: 2 }} />;
    }

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 1, 
                mt: 2, 
                opacity: 0.7 
            }}
        >
            <VisibilityIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: '500' }}>
                {visits.toLocaleString()} Total Site Visits
            </Typography>
        </Box>
    );
}
