import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import LandingPage from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Fat2Fit - Your Express Journey to Fitness',
  description: 'Transform your body and achieve your fitness goals with Fat2Fit. Get personalized workout plans, nutrition guides, calorie calculators, and expert fitness tips.',
  keywords: [
    'fitness platform',
    'personalized workout plans',
    'nutrition guides',
    'calorie calculator',
    'weight loss tips',
    'muscle building guide',
    'HIIT workouts',
    'diet plans',
    'fitness tips',
    'free fitness tools',
    'fat2fit',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fat2Fit - Your Express Journey to Fitness',
    description: 'Transform your body with expert workout plans and nutrition guidance.',
    url: 'https://fat2fitxpress.com',
    type: 'website',
    siteName: 'Fat2Fit',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Fat2Fit - Fitness & Nutrition Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fat2Fit - Your Express Journey to Fitness',
    description: 'Transform your body with personalized workout plans, diet guides, and free fitness calculators.',
    images: ['/og-image.png'],
    site: '@fat2fit',
    creator: '@fat2fit',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fat2Fit',
  url: 'https://fat2fitxpress.com',
  description: 'Personalized fitness and nutrition platform',
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
