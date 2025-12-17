import { getAllPosts } from '@/lib/posts';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 2); // Get latest 2 posts

  return <LandingPage recentPosts={recentPosts} />;
}
