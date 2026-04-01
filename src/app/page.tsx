import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import LandingPage from '@/components/LandingPage';

export const metadata: Metadata = {
  title: { absolute: 'Fat2Fit - Longevity, Bio-Optimization & Science-Backed Fitness Blog 2026' },
  description: 'Start your Fat2Fit journey with AI-powered fitness coaching, longevity protocols, fibermaxxing guides, and metabolic health optimization. Free TDEE calculators, snack-sized workout plans, and science-backed nutrition for sustainable fat loss and peak healthspan in 2026.',
  keywords: [
    'Fat 2 Fit',
    'Fat2Fit transformation',
    // Bio-Optimization
    'AI fitness coach 2026',
    'wearable technology 2026',
    'heart rate variability HRV',
    'biological age testing',
    'smart ring sleep analysis',
    'biomarker integration fitness',
    'red light therapy recovery',
    // Longevity
    'longevity protocols 2026',
    'longevity training',
    'sarcopenia prevention',
    'grip strength for longevity',
    'mitochondrial health',
    'healthspan optimization',
    'visceral fat reduction',
    // Nutrition & Gut Health
    'fibermaxxing guide',
    'GLP-1 natural alternatives',
    'microbiome personalization',
    'metabolic flexibility training',
    'gut health diet 2026',
    'high protein meal plan',
    // Holistic Wellness
    'somatic yoga for trauma',
    'breathwork cortisol reduction',
    'vagus nerve stimulation',
    'cold plunge sauna benefits',
    'JOMO wellness mindset',
    'sleep hygiene rituals',
    // Gentle Movement
    'Zone Zero training',
    'snack-sized workouts',
    'micro-habits for fitness',
    'cycle syncing workouts',
    'Pilates core strength',
    'low-intensity functional training',
    'mobility exercises hip pain',
    'calisthenics for beginners',
    // Core
    'Hybrid training protocols',
    'Functional fitness 2026',
    'Metabolic optimization',
    'Biohacking for fat loss',
    'Personalized workout plans',
    'Science-backed nutrition guides',
    'HIIT for longevity',
    'functional training 2026',
    'TDEE calculator free',
    'muscle building protocols',
  ],

  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fat2Fit - Longevity Protocols, Bio-Optimization & Expert Fitness Blog 2026',
    description: 'Transform your body with Fat2Fit. Longevity training, fibermaxxing, snack-sized workouts, HRV tracking, and AI-powered coaching — all science-backed.',
    url: 'https://fat2fitxpress.com',
    type: 'website',
    siteName: 'Fat 2 Fit',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Fat2Fit - Longevity, Bio-Optimization & Fitness Platform 2026',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fat2Fit - Longevity, Bio-Optimization & Fitness Blog 2026',
    description: 'Science-backed longevity protocols, fibermaxxing, snack-sized workouts, and AI coaching. Free TDEE calculators and transformation guides.',
    images: ['/og-image.png'],
    site: '@fat2fit',
    creator: '@fat2fit',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fat 2 Fit',
  url: 'https://fat2fitxpress.com',
  description: 'Professional transformation & fitness hub providing science-backed guides and tools.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://fat2fitxpress.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://fat2fitxpress.com',
    },
  ],
};

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 2); // Get latest 2 posts

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LandingPage recentPosts={recentPosts} />
    </>
  );
}
