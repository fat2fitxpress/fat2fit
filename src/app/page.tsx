import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import LandingPage from '@/components/LandingPage';

export const metadata: Metadata = {
  title: { absolute: 'Fat2Fit - Best Fitness Blog, Workout Plans & Weight Loss Tools' },
  description: 'Embark on your Fat2Fit journey with AI-powered fitness coaching, longevity training, and metabolic health guides. Get personalized workout plans, science-backed nutrition, and free calorie calculators.',
  keywords: [
    'Fat 2 Fit',
    'Fat2Fit',
    'AI fitness coach',
    'longevity training',
    'metabolic optimization',
    'biohacking for fat loss',
    'personalized workout plans',
    'nutrition guides',
    'gut health fitness',
    'weight loss tools',
    'muscle building protocols',
    'HIIT for longevity',
    'functional training 2026',
  ],

  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fat 2 Fit - Your Transformation & Fitness Hub',
    description: 'Transform your body with expert Fat 2 Fit workout plans and nutrition guidance.',
    url: 'https://fat2fitxpress.com',
    type: 'website',
    siteName: 'Fat 2 Fit',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Fat 2 Fit - Fitness & Nutrition Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fat 2 Fit - Transformation & Professional Fitness Blog',
    description: 'Professional transformation guides, personalized workout plans, diet guides, and free fitness calculators.',
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
