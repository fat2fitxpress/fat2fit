'use client';

import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Gemini-inspired palettes
// Dark mode: Deep blues, vibrant gradients
// Light mode: Clean, soft blues

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Standard Blue, adaptable
            light: '#4791db',
            dark: '#115293',
        },
        secondary: {
            main: '#d93025', // Red accent
        },
        background: {
            default: '#ffffff',
            paper: '#f8f9fa',
        },
        text: {
            primary: '#1f1f1f',
            secondary: '#444746',
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 20,
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8ab4f8', // Light blue
            light: '#aecbfa',
            dark: '#669df6',
        },
        secondary: {
            main: '#f28b82', // Soft red
        },
        background: {
            default: '#0b1221', // Deep tech blue/black
            paper: '#131b2f',
        },
        text: {
            primary: '#e3e3e3',
            secondary: '#aeb3b8',
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            background: 'linear-gradient(45deg, #4285f4, #9b72cb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 20,
                },
            },
        },
    },
});
