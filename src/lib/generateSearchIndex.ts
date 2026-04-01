import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SearchIndexItem {
    id: string; // loc
    title: string;
    description: string;
    category: string; // Tips, Diet, Workout
    url: string;
}

/**
 * Get all markdown files from a content directory and map to search index
 */
function getSearchData(contentDir: string, categoryLabel: string): SearchIndexItem[] {
    const contentPath = path.join(process.cwd(), 'src', 'content', contentDir);

    if (!fs.existsSync(contentPath)) {
        console.warn(`Directory not found: ${contentPath}`);
        return [];
    }

    const files = fs.readdirSync(contentPath);
    const items: SearchIndexItem[] = [];

    files.forEach((filename) => {
        if (!filename.endsWith('.md')) return;

        const slug = filename.replace('.md', '');
        const filePath = path.join(contentPath, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        let urlPath = '';
        if (contentDir === 'tips') {
            urlPath = `/tips/${slug}`;
        } else if (contentDir === 'diets') {
            urlPath = `/diet/${slug}`;
        } else if (contentDir === 'workouts') {
            urlPath = `/workout-plan/${slug}`;
        }

        items.push({
            id: urlPath,
            title: data.title || '',
            description: data.description || data.excerpt || '',
            category: categoryLabel,
            url: urlPath,
        });
    });

    return items;
}

/**
 * Generate search index JSON
 */
export function generateSearchIndex(): void {
    // Get all content items
    const tips = getSearchData('tips', 'Tips');
    const diets = getSearchData('diets', 'Diet');
    const workouts = getSearchData('workouts', 'Workout');

    // Combine all
    const allItems = [...tips, ...diets, ...workouts];

    // Write to public directory
    const publicPath = path.join(process.cwd(), 'public', 'search-index.json');
    fs.writeFileSync(publicPath, JSON.stringify(allItems), 'utf-8');
    console.log(`Successfully generated search-index.json with ${allItems.length} items`);
}

// Run if called directly
if (require.main === module) {
    generateSearchIndex();
}
