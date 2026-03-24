import * as React from 'react';
import type { Metadata, Viewport } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import Box from '@mui/material/Box';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://fat2fitxpress.com'),
  title: {
    default: 'Fat2Fit | Science-Backed Fitness Blog & Transformation Guides',
    template: '%s | Fat2Fit'
  },
  description: 'Transform your body with the Fat 2 Fit journey. Personalized workout plans, nutrition guides, TDEE & macro calculators, and expert online fitness coaching for sustainable weight loss and muscle building.',
  manifest: '/manifest.json',
  keywords: [
    'Fat 2 Fit',
    'Fat2Fit',
    'Fat 2 Fit journey',
    'Fat2FitXpress',
    'best fitness blog 2026',
    'expert health advice',
    'AI fitness coach',
    'Hybrid training',
    'Functional fitness 2026',
    'Longevity workouts',
    'longevity training',
    'metabolic health',
    'Metabolic health optimization',
    'biohacking protocols',
    'Biohacking protocols 2026',
    'gut health diet',
    'High-fiber gut health diet',
    'nervous system regulation',
    'cellular health fitness',
    'science-backed weight loss',
    'Science-backed weight loss 2026',
    'personalized workout plans',
    'Personalized workout plans 2026',
    'nutrition guides',
    'calorie calculator',
    'TDEE calculator',
    'macro calculator',
    'TDEE & macro calculator',
    'weight loss',
    'muscle building',
    'Muscle building protocols',
    'HIIT benefits',
    'HIIT for longevity',
    'strength training',
    'Strength training for women',
    'progressive overload for women',
    'women strength training guide',
    'reverse running benefits',
    'reverse running workout',
    'Japanese walking',
    'Japanese interval walking workout',
    'Online fitness coaching for weight loss',
    'best weight loss program for busy professionals',
    'Cortisol and belly fat',
    'Stress-weight gain connection',
    'Busy professionals fitness',
    'tech workers weight loss',
    'Ozempic natural alternatives',
    'GLP-1 friendly meals',
    'Fibermaxxing',
    'Grip strength optimization',
    'Wearable technology',
    'Wearable health tracking',
    'sleep and fat loss',
    'circadian rhythm optimization',
    'fitness tracking technology',
    'healthspan optimization',
    'Healthspan 2026',
    'neurowellness',
    'GLP-1 metabolic health',
    'biohacking performance',
    'gut health microbiome',
    'longevity biohacking 2026',
    'adaptive fitness AI',
    'hormonal health optimization',
    'functional longevity training',
    'bone density strength training',
    'deload week benefits',
  ],
  authors: [{ name: 'Fat 2 Fit Team' }],
  creator: 'Fat 2 Fit',
  publisher: 'Fat 2 Fit',
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
    title: 'Fat2Fit | Expert Fitness Blog & Transformation Guides',
    description: 'Transform your body with Fat2Fit. Science-backed workout plans, personalized longevity coaching, and AI-driven metabolic health guides.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fat 2 Fit - Fitness & Nutrition Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fat 2 Fit | Express Fitness & Health Blog',
    description: 'Your transformation starts here. Personalized workout plans and expert nutrition guides.',
    images: ['/og-image.png'],
    site: '@fat2fit',
    creator: '@fat2fit',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fat2Fit',
  alternateName: ['Fat 2 Fit', 'Fat 2 Fit Xpress'],
  url: 'https://fat2fitxpress.com',
  logo: 'https://fat2fitxpress.com/logo.png',
  sameAs: [
    'https://twitter.com/fat2fit',
    'https://instagram.com/fat2fit',
    'https://youtube.com/fat2fit'
  ],
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';
  return (
    <html lang="en">
      <head>
        {/* Preload critical hero image */}
        <link
          rel="preload"
          as="image"
          href="/fitness_hero_background.webp"
          imageSrcSet="/fitness_hero_background_mobile.webp 800w, /fitness_hero_background.webp 1920w"
          imageSizes="100vw"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript fallback) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* Google Tag Manager */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <ThemeRegistry>
          <ErrorBoundary>
            <Navbar />
            <Box
              component="main"
              id="main-content"
              role="main"
              sx={{ flexGrow: 1, minHeight: '80vh' }}
            >
              {children}
            </Box>
            <Footer />
          </ErrorBoundary>
        </ThemeRegistry>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
