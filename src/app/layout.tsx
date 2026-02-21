import * as React from 'react';
import type { Metadata, Viewport } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';
  return (
    <html lang="en">
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
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
