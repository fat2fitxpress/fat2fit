import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import BreadcrumbsNav from '@/components/BreadcrumbsNav';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface DetailPageLayoutProps {
    /** Markdown content to render */
    content: string;
    /** Breadcrumb items for navigation */
    breadcrumbs: BreadcrumbItem[];
    /** URL to navigate back to */
    backHref: string;
    /** Label for the back button */
    backLabel: string;
    /** Call-to-action heading */
    ctaHeading: string;
    /** Call-to-action button text */
    ctaButtonText: string;
    /** Schema markup to inject */
    schemas: Record<string, any>[];
}

/**
 * Shared layout component for detail pages (diets, workouts)
 * Provides consistent styling and structure
 */
export default function DetailPageLayout({
    content,
    breadcrumbs,
    backHref,
    backLabel,
    ctaHeading,
    ctaButtonText,
    schemas,
}: DetailPageLayoutProps) {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            {/* Schema Markup */}
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            {/* Breadcrumbs Navigation */}
            <BreadcrumbsNav items={breadcrumbs} />

            {/* Back Button */}
            <Link
                href={backHref}
                style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    color: '#1976d2',
                }}
            >
                <ArrowBackIcon sx={{ mr: 1 }} />
                {backLabel}
            </Link>

            {/* Content Container */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    p: { xs: 3, md: 6 },
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    '& h1': {
                        color: 'primary.main',
                        fontWeight: 'bold',
                        mb: 4,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                    },
                    '& h2': {
                        color: 'text.primary',
                        mt: 6,
                        mb: 3,
                        fontWeight: 'bold',
                        borderBottom: '2px solid',
                        borderColor: 'primary.main',
                        display: 'inline-block',
                        pb: 1,
                    },
                    '& h3': {
                        mt: 4,
                        mb: 2,
                        color: 'primary.light',
                        fontWeight: 'bold',
                    },
                    '& p': {
                        mb: 2,
                        lineHeight: 1.8,
                        color: 'text.secondary',
                    },
                    '& li': {
                        mb: 1.5,
                        color: 'text.secondary',
                        lineHeight: 1.6,
                    },
                    '& hr': {
                        my: 6,
                        opacity: 0.1,
                    },
                }}
            >
                <ReactMarkdown>{content}</ReactMarkdown>
            </Box>

            {/* Call to Action */}
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="text.primary">
                    {ctaHeading}
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 2, borderRadius: 8, px: 6 }}
                >
                    {ctaButtonText}
                </Button>
            </Box>
        </Container>
    );
}
