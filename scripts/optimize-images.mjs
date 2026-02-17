#!/usr/bin/env node

/**
 * Image Optimization Script for Fat2Fit
 * Uses Sharp library to compress PNG files and create WebP versions
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    publicDir: path.join(__dirname, '..', 'public'),
    backupDir: path.join(__dirname, '..', 'public', 'originals'),
    pngQuality: 85,
    webpQuality: 80,
};

// Images to optimize
const imagesToOptimize = [
    'og-image.png',
    'fitness_hero_background.png',
    'workout_hero_bg.png',
    'favicon.png',
    'logo.png'
];

// Images to convert to WebP (large images only)
const imagesToConvert = [
    'og-image.png',
    'fitness_hero_background.png',
    'workout_hero_bg.png'
];

// ANSI color codes
const colors = {
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    gray: '\x1b[90m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function ensureBackupDir() {
    try {
        await fs.access(config.backupDir);
    } catch {
        await fs.mkdir(config.backupDir, { recursive: true });
        log(`✓ Created backup directory: ${config.backupDir}`, 'green');
    }
}

async function getFileSize(filePath) {
    const stats = await fs.stat(filePath);
    return (stats.size / 1024).toFixed(1); // KB
}

async function backupImage(filePath, fileName) {
    const backupPath = path.join(config.backupDir, fileName);
    try {
        await fs.access(backupPath);
        // Backup already exists
    } catch {
        await fs.copyFile(filePath, backupPath);
        log(`  Backed up: ${fileName}`, 'gray');
    }
}

async function optimizePNG(fileName) {
    const filePath = path.join(config.publicDir, fileName);

    try {
        await fs.access(filePath);
    } catch {
        log(`○ ${fileName} not found, skipping`, 'yellow');
        return;
    }

    const originalSize = await getFileSize(filePath);

    // Backup original
    await backupImage(filePath, fileName);

    // Optimize PNG
    const tempFile = filePath + '.tmp.png';

    await sharp(filePath)
        .png({ quality: config.pngQuality, compressionLevel: 9 })
        .toFile(tempFile);

    const newSize = await getFileSize(tempFile);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    if (parseFloat(newSize) < parseFloat(originalSize)) {
        await fs.rename(tempFile, filePath);
        log(`✓ ${fileName}`, 'green');
        log(`  ${originalSize} KB → ${newSize} KB (saved ${savings}%)`, 'gray');
    } else {
        await fs.unlink(tempFile);
        log(`○ ${fileName} (already optimized)`, 'yellow');
    }
}

async function createWebP(fileName) {
    const pngPath = path.join(config.publicDir, fileName);
    const webpName = fileName.replace('.png', '.webp');
    const webpPath = path.join(config.publicDir, webpName);

    try {
        await fs.access(pngPath);
    } catch {
        log(`○ ${fileName} not found, skipping WebP conversion`, 'yellow');
        return;
    }

    const originalSize = await getFileSize(pngPath);

    await sharp(pngPath)
        .webp({ quality: config.webpQuality })
        .toFile(webpPath);

    const webpSize = await getFileSize(webpPath);
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    log(`✓ Created ${webpName}`, 'green');
    log(`  ${originalSize} KB → ${webpSize} KB (saved ${savings}%)`, 'gray');
}

async function createIconSizes() {
    const faviconPath = path.join(config.publicDir, 'favicon.png');

    try {
        await fs.access(faviconPath);
    } catch {
        log('○ favicon.png not found, skipping icon generation', 'yellow');
        return;
    }

    const sizes = [
        { size: 192, name: 'icon-192.png' },
        { size: 512, name: 'icon-512.png' },
        { size: 180, name: 'apple-touch-icon.png' }
    ];

    log('', 'reset');
    log('Creating Additional Icon Sizes:', 'cyan');
    log('-------------------------------', 'cyan');

    for (const { size, name } of sizes) {
        const outputPath = path.join(config.publicDir, name);

        await sharp(faviconPath)
            .resize(size, size, { fit: 'cover' })
            .png({ quality: 90, compressionLevel: 9 })
            .toFile(outputPath);

        const fileSize = await getFileSize(outputPath);
        log(`✓ Created ${name} (${size}x${size}) - ${fileSize} KB`, 'green');
    }
}

async function main() {
    log('Fat2Fit Image Optimization Utility', 'cyan');
    log('===================================', 'cyan');
    log('', 'reset');

    log('Using Sharp library for optimization', 'gray');
    log('', 'reset');

    // Ensure backup directory exists
    await ensureBackupDir();

    log('', 'reset');
    log('Optimization Settings:', 'cyan');
    log(`  PNG Quality: ${config.pngQuality}%`, 'gray');
    log(`  WebP Quality: ${config.webpQuality}%`, 'gray');
    log(`  Backup Directory: ${config.backupDir}`, 'gray');
    log('', 'reset');

    // Optimize PNG files
    log('Optimizing PNG Images:', 'cyan');
    log('---------------------', 'cyan');

    for (const image of imagesToOptimize) {
        await optimizePNG(image);
    }

    // Create WebP versions
    log('', 'reset');
    log('Creating WebP Versions:', 'cyan');
    log('----------------------', 'cyan');

    for (const image of imagesToConvert) {
        await createWebP(image);
    }

    // Create additional icon sizes
    await createIconSizes();

    log('', 'reset');
    log('✓ Optimization complete!', 'green');
    log('', 'reset');
    log('Next Steps:', 'cyan');
    log('1. Review optimized images for quality', 'gray');
    log('2. Update manifest.json to include new icon sizes', 'gray');
    log('3. Test on mobile devices', 'gray');
    log('4. Run Lighthouse to verify improvements', 'gray');
    log(`5. Original files backed up in: ${config.backupDir}`, 'gray');
    log('', 'reset');
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
