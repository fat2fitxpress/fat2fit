'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsNavProps {
    items: BreadcrumbItem[];
}

export default function BreadcrumbsNav({ items }: BreadcrumbsNavProps) {
    return (
        <Box sx={{ mb: 3 }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link
                    href="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                        Home
                    </Typography>
                </Link>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    if (isLast) {
                        return (
                            <Typography key={item.href} variant="body2" color="text.primary">
                                {item.label}
                            </Typography>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                {item.label}
                            </Typography>
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
}
