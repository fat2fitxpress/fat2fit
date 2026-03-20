const fs = require('fs');
const path = require('path');

// Next.js App Router static exports generate RSC payload files nested inside directories
// like /tips/__next.tips/__PAGE__.txt, or /tips/post/__next.tips/$d$slug/__PAGE__.txt.
// But the Next.js client router expects them to be at 
// /tips/__next.tips.__PAGE__.txt or /tips/post/__next.tips.$d$slug.__PAGE__.txt.
// This script runs after `next build` to flatten these directories so simple static 
// servers don't return 404s.

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

function fixRscPayloads(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    
    if (fs.statSync(fullPath).isDirectory()) {
      // If we find a Next.js hidden RSC payload directory like __next.tips
      if (item.startsWith('__next.')) {
        // Find all files nested inside this directory
        const allInnerFiles = getAllFiles(fullPath);
        
        for (const innerFile of allInnerFiles) {
          // Calculate the relative path from the '__next.*' directory
          const relativePath = path.relative(fullPath, innerFile);
          
          // Replace path separators with dots.
          // Example: '$d$slug\\__PAGE__.txt' -> '$d$slug.__PAGE__.txt'
          const dotSeparated = relativePath.split(path.sep).join('.');
          
          // Construct the new filename. Example: '__next.tips.$d$slug.__PAGE__.txt'
          const newFileName = `${item}.${dotSeparated}`;
          
          // Copy it to the parent directory
          const dest = path.join(dir, newFileName);
          fs.copyFileSync(innerFile, dest);
          console.log(`Copied: ${dest}`);
        }
      }
      
      // Continue walking the file tree
      fixRscPayloads(fullPath);
    }
  }
}

const outDir = path.join(__dirname, '../out');
if (fs.existsSync(outDir)) {
  fixRscPayloads(outDir);
  console.log('Fixed RSC payload paths for static export.');
} else {
  console.error('out directory not found.');
}
