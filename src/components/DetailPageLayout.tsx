import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
    /** Whether to show breadcrumbs (default true) */
    showBreadcrumbs?: boolean;
    /** URL to navigate back to */
    backHref: string;
    /** Label for the back button */
    backLabel: string;
    /** Call-to-action heading */
    ctaHeading: string;
    /** Call-to-action button text */
    ctaButtonText: string;
    /** Optional URL for the CTA button (defaults to backHref) */
    ctaHref?: string;
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
    ctaHref,
    schemas,
    showBreadcrumbs = true,
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
            {showBreadcrumbs && <BreadcrumbsNav items={breadcrumbs} />}

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
                        mt: 4,
                        mb: 2,
                        fontWeight: 'bold',
                        borderBottom: '2px solid',
                        borderColor: 'primary.main',
                        display: 'inline-block',
                        pb: 1,
                    },
                    '& h3': {
                        mt: 3,
                        mb: 1.5,
                        color: 'primary.light',
                        fontWeight: 'bold',
                    },
                    '& p': {
                        mb: 2,
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: 'text.secondary',
                    },
                    '& ul, & ol': {
                        mb: 3,
                        pl: 3,
                    },
                    '& li': {
                        mb: 1,
                        fontSize: 16,
                        color: 'text.secondary',
                        lineHeight: 1.6,
                    },
                    '& hr': {
                        my: 6,
                        opacity: 0.1,
                    },
                    '& strong': {
                        color: 'text.primary',
                        fontWeight: 600,
                    },
                    '& blockquote': {
                        borderLeft: '4px solid',
                        borderColor: 'primary.main',
                        pl: 3,
                        py: 1,
                        my: 3,
                        bgcolor: 'action.hover',
                        borderRadius: 1,
                        '& p': { mb: 0 },
                    },
                    // ── Table styles ──────────────────────────────────────
                    '& .table-wrapper': {
                        overflowX: 'auto',
                        my: 4,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    },
                    '& table': {
                        width: '100%',
                        borderCollapse: 'collapse',
                        minWidth: '600px',
                    },
                    '& thead': {
                        bgcolor: 'primary.main',
                    },
                    '& thead th': {
                        color: '#ffffff',
                        fontWeight: 700,
                        px: 2,
                        py: 2,
                        textAlign: 'left',
                        fontSize: '0.95rem',
                    },
                    '& tbody tr': {
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:nth-of-type(even)': {
                            bgcolor: 'action.hover',
                        },
                        '&:hover': {
                            bgcolor: 'action.selected',
                        },
                    },
                    '& td': {
                        px: 2,
                        py: 1.5,
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                    },
                    '& td:first-of-type': {
                        color: 'text.primary',
                        fontWeight: 500,
                    },
                }}
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: ({ ...props }) => (
                            <div className="table-wrapper">
                                <table {...props} />
                            </div>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </Box>

            {/* Call to Action */}
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="text.primary">
                    {ctaHeading}
                </Typography>
                <Link href={ctaHref || backHref} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 2, borderRadius: 8, px: 6 }}
                    >
                        {ctaButtonText}
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}


