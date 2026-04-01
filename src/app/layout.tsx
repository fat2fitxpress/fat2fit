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
    default: 'Fat2Fit | Science-Backed Fitness Blog & Transformation Guides 2026',
    template: '%s | Fat2Fit'
  },
  description: 'Transform your body with Fat2Fit. Personalized workout plans, nutrition guides, TDEE & macro calculators, longevity protocols, and AI-powered fitness coaching for sustainable fat loss, muscle building, and long-term healthspan optimization.',
  manifest: '/manifest.json',
  keywords: [
    'Fat 2 Fit',
    'Fat2Fit',
    'Fat 2 Fit journey',
    'Fat2FitXpress',
    'best fitness blog 2026',
    'expert health advice',
    // Bio-Optimization & Tech
    'AI fitness coach',
    'AI-powered fitness coaching',
    'wearable technology 2026',
    'smart ring sleep analysis',
    'heart rate variability HRV recovery',
    'continuous glucose monitor for non-diabetics',
    'biological age testing',
    'biomarker integration',
    'digital twin health tracking',
    'red light therapy for recovery',
    // Longevity & Preventative Health
    'longevity protocols',
    'longevity training',
    'sarcopenia prevention exercises',
    'grip strength for longevity',
    'mitochondrial health diet',
    'cellular health optimization',
    'visceral fat reduction tips',
    'biological age reversal',
    'healthspan optimization',
    'Healthspan 2026',
    'positive aging routines',
    // Nutrition & Gut Health
    'GLP-1 natural alternatives',
    'Ozempic natural alternatives',
    'GLP-1 friendly meals',
    'microbiome personalization',
    'postbiotic supplements',
    'Fibermaxxing',
    'fibermaxxing recipes',
    'metabolic flexibility training',
    'high protein desserts',
    'gut health diet',
    'gut health microbiome',
    'High-fiber gut health diet',
    'GLP-1 metabolic health',
    // Holistic & Mental Wellness
    'somatic yoga for trauma',
    'breathwork for cortisol reduction',
    'vagus nerve stimulation exercises',
    'cold plunge and sauna benefits',
    'sleep hygiene rituals',
    'mind-body integration workouts',
    'JOMO wellness mindset',
    'nervous system regulation',
    'digital detox wellness',
    // Functional & Gentle Movement
    'Zone Zero training',
    'snack-sized workouts',
    'micro-habits for fitness',
    'cycle syncing workouts',
    'chair yoga for seniors',
    'Pilates for core strength',
    'low-intensity functional training',
    'mobility exercises for hip pain',
    'calisthenics for beginners',
    'Hyrox training for beginners',
    // Existing core keywords
    'Hybrid training',
    'Functional fitness 2026',
    'metabolic health',
    'Metabolic health optimization',
    'biohacking protocols',
    'Biohacking protocols 2026',
    'science-backed weight loss',
    'personalized workout plans',
    'calorie calculator',
    'TDEE calculator',
    'macro calculator',
    'weight loss',
    'muscle building',
    'HIIT benefits',
    'HIIT for longevity',
    'strength training',
    'Strength training for women',
    'progressive overload for women',
    'women strength training guide',
    'reverse running benefits',
    'Japanese interval walking workout',
    'Online fitness coaching for weight loss',
    'best weight loss program for busy professionals',
    'Cortisol and belly fat',
    'hormonal health optimization',
    'functional longevity training',
    'bone density strength training',
    'adaptive fitness AI',
    'circadian rhythm optimization',
    'biohacking performance',
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
    title: 'Fat2Fit | Science-Backed Fitness Blog, Longevity & Bio-Optimization 2026',
    description: 'Transform your body with Fat2Fit. Longevity protocols, AI coaching, metabolic health guides, fibermaxxing, HRV tracking, and science-backed nutrition for sustainable fat loss and peak healthspan.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fat 2 Fit - Fitness, Longevity & Bio-Optimization Platform 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fat2Fit | Longevity, Bio-Optimization & Expert Fitness Blog 2026',
    description: 'Science-backed longevity protocols, snack-sized workouts, fibermaxxing guides, and AI-powered coaching. Start your transformation today.',
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
