'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary component to catch JavaScript errors in child component tree
 * Displays a fallback UI and prevents the entire app from crashing
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to console (can be extended to send to error tracking service)
        console.error('Uncaught error:', error, errorInfo);

        // You can also log to an error reporting service here
        // e.g., Sentry.captureException(error);
    }

    handleReset = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <Container maxWidth="md">
                    <Box
                        sx={{
                            py: 8,
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                        }}
                    >
                        <Typography variant="h3" color="error" gutterBottom>
                            Oops! Something went wrong
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            We encountered an unexpected error. Don't worry, your data is safe.
                        </Typography>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'error.light',
                                    color: 'error.contrastText',
                                    borderRadius: 2,
                                    maxWidth: '100%',
                                    overflow: 'auto',
                                    textAlign: 'left',
                                }}
                            >
                                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', m: 0 }}>
                                    {this.state.error.toString()}
                                </Typography>
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<RefreshIcon />}
                            onClick={this.handleReset}
                            sx={{ mt: 2 }}
                        >
                            Try Again
                        </Button>

                        <Button
                            variant="text"
                            href="/"
                            sx={{ mt: 1 }}
                        >
                            Go to Homepage
                        </Button>
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
