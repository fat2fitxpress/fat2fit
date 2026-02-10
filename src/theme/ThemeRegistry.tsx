'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { lightTheme, darkTheme } from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

    // Initialize theme from localStorage on mount
    React.useEffect(() => {
        const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    // Persist theme changes to localStorage
    React.useEffect(() => {
        localStorage.setItem('theme-mode', mode);
    }, [mode]);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            mode,
        }),
        [mode],
    );

    const theme = React.useMemo(
        () => (mode === 'light' ? lightTheme : darkTheme),
        [mode],
    );

    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </NextAppDirEmotionCacheProvider>
    );
}

export const ColorModeContext = React.createContext({
    toggleColorMode: () => { },
    mode: 'dark',
});
