import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
}

const baseUrl = 'https://fat2fitxpress.com';

// Static pages configuration
const staticPages: SitemapUrl[] = [
    {
        loc: '/',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '1.0',
    },
    {
        loc: '/calculator',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.9',
    },
    {
        loc: '/workout-plan',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9',
    },
    {
        loc: '/diet',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9',
    },
    {
        loc: '/tips',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '0.8',
    },
    {
        loc: '/contact',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
    },
];

/**
 * Get all markdown files from a content directory
 */
function getContentFiles(contentDir: string): SitemapUrl[] {
    const contentPath = path.join(process.cwd(), 'src', 'content', contentDir);

    if (!fs.existsSync(contentPath)) {
        console.warn(`Directory not found: ${contentPath}`);
        return [];
    }

    const files = fs.readdirSync(contentPath);
    const urls: SitemapUrl[] = [];

    files.forEach((filename) => {
        if (!filename.endsWith('.md')) return;

        const slug = filename.replace('.md', '');
        const filePath = path.join(contentPath, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        // Get last modified date from frontmatter or file stats
        let lastmod = new Date().toISOString().split('T')[0];
        if (data.date) {
            lastmod = new Date(data.date).toISOString().split('T')[0];
        } else {
            const stats = fs.statSync(filePath);
            lastmod = stats.mtime.toISOString().split('T')[0];
        }

        let urlPath = '';
        if (contentDir === 'tips') {
            urlPath = `/tips/${slug}`;
        } else if (contentDir === 'diets') {
            urlPath = `/diet/${slug}`;
        } else if (contentDir === 'workouts') {
            urlPath = `/workout-plan/${slug}`;
        }

        urls.push({
            loc: urlPath,
            lastmod,
            changefreq: 'weekly',
            priority: '0.8',
        });
    });

    return urls;
}

/**
 * Generate sitemap XML
 */
export function generateSitemap(): string {
    // Get all content URLs
    const tipsUrls = getContentFiles('tips');
    const dietUrls = getContentFiles('diets');
    const workoutUrls = getContentFiles('workouts');

    // Combine all URLs
    const allUrls = [...staticPages, ...tipsUrls, ...dietUrls, ...workoutUrls];

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
            .map(
                (url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return xml;
}

/**
 * Write sitemap to public directory
 */
export function writeSitemap(): void {
    const sitemap = generateSitemap();
    const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(publicPath, sitemap, 'utf-8');
    console.log('✓ Sitemap generated successfully!');
    console.log(`  Location: ${publicPath}`);
}

// Run if called directly
if (require.main === module) {
    writeSitemap();
}
