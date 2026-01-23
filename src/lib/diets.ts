import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dietsDirectory = path.join(process.cwd(), 'src/content/diets');

export interface DietDetail {
    slug: string;
    content: string;
    title: string;
    description: string;
    image: string;
    prepTime: string;
    calories: string;
    category: string;
}

export function getDietBySlug(slug: string): DietDetail | null {
    try {
        const realSlug = slug.replace(/\.md$/, '');
        const fullPath = path.join(dietsDirectory, `${realSlug}.md`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug: realSlug,
            content,
            title: data.title || realSlug,
            description: data.description || '',
            image: data.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200',
            prepTime: data.prepTime || '20 mins',
            calories: data.calories || '2000 kcal',
            category: data.category || 'Balanced',
        };
    } catch (e) {
        console.error('Error reading diet:', e);
        return null;
    }
}

export function getAllDiets(): DietDetail[] {
    if (!fs.existsSync(dietsDirectory)) return [];
    const fileNames = fs.readdirSync(dietsDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            return getDietBySlug(slug);
        })
        .filter((diet): diet is DietDetail => diet !== null);
}

export function getAllDietSlugs() {
    if (!fs.existsSync(dietsDirectory)) return [];
    return fs.readdirSync(dietsDirectory)
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            return fileName.replace(/\.md$/, '');
        });
}
