import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ASSETS_DIR = path.join(process.cwd(), 'src/assets');

async function optimizeImages() {
    console.log('Starting image optimization...');

    // 1. Optimize Hero Background
    const heroPath = path.join(PUBLIC_DIR, 'fitness_hero_background.png');
    const heroWebpPath = path.join(PUBLIC_DIR, 'fitness_hero_background.webp');
    const heroMobileWebpPath = path.join(PUBLIC_DIR, 'fitness_hero_background_mobile.webp');

    if (fs.existsSync(heroPath)) {
        console.log('Optimizing hero background...');
        const heroImage = sharp(heroPath);

        // Desktop WebP
        await heroImage
            .webp({ quality: 80 })
            .toFile(heroWebpPath);
        console.log('Generated fitness_hero_background.webp');

        // Mobile WebP (resized)
        await heroImage
            .resize(800) // Max width for mobile
            .webp({ quality: 75 })
            .toFile(heroMobileWebpPath);
        console.log('Generated fitness_hero_background_mobile.webp');
    } else {
        console.warn('Hero background not found at', heroPath);
    }

    // 1b. Optimize Workout Hero Background
    const workoutHeroPath = path.join(PUBLIC_DIR, 'workout_hero_bg.png');
    const workoutHeroWebpPath = path.join(PUBLIC_DIR, 'workout_hero_bg.webp');
    const workoutHeroMobileWebpPath = path.join(PUBLIC_DIR, 'workout_hero_bg_mobile.webp');

    if (fs.existsSync(workoutHeroPath)) {
        console.log('Optimizing workout hero background...');
        const workoutHeroImage = sharp(workoutHeroPath);

        await workoutHeroImage
            .webp({ quality: 80 })
            .toFile(workoutHeroWebpPath);
        console.log('Generated workout_hero_bg.webp');

        await workoutHeroImage
            .resize(800)
            .webp({ quality: 75 })
            .toFile(workoutHeroMobileWebpPath);
        console.log('Generated workout_hero_bg_mobile.webp');
    }

    // 2. Optimize Logo
    const logoPath = path.join(ASSETS_DIR, 'logo.png');
    const logoOptimizedPath = path.join(ASSETS_DIR, 'logo_optimized.png');
    const logoWebpPath = path.join(ASSETS_DIR, 'logo.webp');

    if (fs.existsSync(logoPath)) {
        console.log('Optimizing logo...');
        const logoImage = sharp(logoPath);

        // Resize logo to a more reasonable base size (e.g. 500px width)
        await logoImage
            .resize(500)
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(logoOptimizedPath);
        console.log('Generated logo_optimized.png');

        await logoImage
            .resize(500)
            .webp({ quality: 85 })
            .toFile(logoWebpPath);
        console.log('Generated logo.webp');
    } else {
        // Check if it's in public (as layout.tsx suggests /logo.png)
        const logoPublicPath = path.join(PUBLIC_DIR, 'logo.png');
        if (fs.existsSync(logoPublicPath)) {
            console.log('Optimizing public logo...');
            const logoImage = sharp(logoPublicPath);
            await logoImage
                .resize(500)
                .png({ quality: 80 })
                .toFile(path.join(PUBLIC_DIR, 'logo_optimized.png'));
            await logoImage
                .resize(500)
                .webp({ quality: 85 })
                .toFile(path.join(PUBLIC_DIR, 'logo.webp'));
        } else {
            console.warn('Logo not found in assets or public');
        }
    }

    console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);
