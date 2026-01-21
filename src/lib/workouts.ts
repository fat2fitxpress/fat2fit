import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const workoutsDirectory = path.join(process.cwd(), 'src/content/workouts');

export interface WorkoutDetail {
    slug: string;
    content: string;
    title: string;
}

export function getWorkoutBySlug(slug: string): WorkoutDetail {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(workoutsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        content,
        title: data.title || realSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    };
}

export function getAllWorkoutSlugs() {
    if (!fs.existsSync(workoutsDirectory)) return [];
    return fs.readdirSync(workoutsDirectory).map(fileName => {
        return fileName.replace(/\.md$/, '');
    });
}
