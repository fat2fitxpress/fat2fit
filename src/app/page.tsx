import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import LandingPage from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Fat2Fit - Your Express Journey to Fitness',
  description: 'Transform your body and achieve your fitness goals with Fat2Fit. Get personalized workout plans, nutrition guides, calorie calculators, and expert fitness tips.',
  openGraph: {
    title: 'Fat2Fit - Your Express Journey to Fitness',
    description: 'Transform your body with expert workout plans and nutrition guidance.',
    url: 'https://fat2fitxpress.com',
    images: ['/og-image.png'],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fat2Fit',
  url: 'https://fat2fitxpress.com',
  description: 'Personalized fitness and nutrition platform',
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
      <LandingPage recentPosts={recentPosts} />
    </>
  );
}
