import * as React from 'react';
import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Box from '@mui/material/Box';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://fat2fitxpress.com'),
  title: {
    default: 'Fat2Fit - Your Express Journey to Fitness',
    template: '%s | Fat2Fit'
  },
  description: 'Transform your body and achieve your fitness goals with Fat2Fit. Get personalized workout plans, nutrition guides, calorie calculators, and expert fitness tips.',
  manifest: '/manifest.json',
  keywords: ['fitness', 'workout plans', 'nutrition', 'calorie calculator', 'weight loss', 'muscle building', 'health', 'diet plans', 'HIIT', 'strength training'],
  authors: [{ name: 'Fat2Fit Team' }],
  creator: 'Fat2Fit',
  publisher: 'Fat2Fit',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fat2fitxpress.com',
    siteName: 'Fat2Fit',
    title: 'Fat2Fit - Your Express Journey to Fitness',
    description: 'Transform your body and achieve your fitness goals with personalized workout plans, nutrition guides, and expert fitness tips.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fat2Fit - Fitness & Nutrition Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fat2Fit - Your Express Journey to Fitness',
    description: 'Transform your body with personalized workout plans and nutrition guides.',
    images: ['/og-image.png'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fat2Fit',
  url: 'https://fat2fitxpress.com',
  logo: 'https://fat2fitxpress.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@fat2fitxpress.com',
    contactType: 'Customer Service',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, minHeight: '80vh' }}>
            {children}
          </Box>
          <Footer />
        </ThemeRegistry>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
