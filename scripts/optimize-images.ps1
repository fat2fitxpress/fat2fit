# Image Optimization Script
# This PowerShell script optimizes images for the Fat2Fit application

Write-Host "Fat2Fit Image Optimization Utility" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if ImageMagick is installed
$imageMagickInstalled = $false
try {
    $version = magick --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        $imageMagickInstalled = $true
        Write-Host "✓ ImageMagick detected" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ ImageMagick not found" -ForegroundColor Yellow
}

if (-not $imageMagickInstalled) {
    Write-Host ""
    Write-Host "ImageMagick is required for image optimization." -ForegroundColor Yellow
    Write-Host "Install with: choco install imagemagick" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: Use online tools" -ForegroundColor Cyan
    Write-Host "  - TinyPNG: https://tinypng.com/" -ForegroundColor Gray
    Write-Host "  - Squoosh: https://squoosh.app/" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

# Configuration
$publicDir = "public"
$backupDir = "public/originals"
$quality = 85

# Create backup directory
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    Write-Host "✓ Created backup directory: $backupDir" -ForegroundColor Green
}

Write-Host ""
Write-Host "Optimization Settings:" -ForegroundColor Cyan
Write-Host "  Quality: $quality%" -ForegroundColor Gray
Write-Host "  Backup: $backupDir" -ForegroundColor Gray
Write-Host ""

# Function to optimize PNG
function Optimize-PNG {
    param (
        [string]$FilePath,
        [int]$Quality = 85
    )
    
    $fileName = Split-Path $FilePath -Leaf
    $fileNameNoExt = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
    $backupPath = Join-Path $backupDir $fileName
    
    # Get original size
    $originalSize = (Get-Item $FilePath).Length / 1KB
    
    # Backup original
    if (-not (Test-Path $backupPath)) {
        Copy-Item $FilePath $backupPath
        Write-Host "  Backed up: $fileName" -ForegroundColor Gray
    }
    
    # Optimize
    $tempFile = "$FilePath.tmp.png"
    magick $FilePath -quality $Quality -strip $tempFile
    
    if (Test-Path $tempFile) {
        $newSize = (Get-Item $tempFile).Length / 1KB
        $savings = [math]::Round(($originalSize - $newSize) / $originalSize * 100, 1)
        
        if ($newSize -lt $originalSize) {
            Move-Item $tempFile $FilePath -Force
            Write-Host "✓ $fileName" -ForegroundColor Green
            Write-Host "  $([math]::Round($originalSize, 1)) KB → $([math]::Round($newSize, 1)) KB (saved $savings%)" -ForegroundColor Gray
        } else {
            Remove-Item $tempFile
            Write-Host "○ $fileName (already optimized)" -ForegroundColor Yellow
        }
    }
}

# Function to create WebP version
function Create-WebP {
    param (
        [string]$FilePath,
        [int]$Quality = 80
    )
    
    $fileName = Split-Path $FilePath -Leaf
    $fileNameNoExt = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
    $webpPath = Join-Path (Split-Path $FilePath) "$fileNameNoExt.webp"
    
    # Get original size
    $originalSize = (Get-Item $FilePath).Length / 1KB
    
    # Create WebP
    magick $FilePath -quality $Quality $webpPath
    
    if (Test-Path $webpPath) {
        $webpSize = (Get-Item $webpPath).Length / 1KB
        $savings = [math]::Round(($originalSize - $webpSize) / $originalSize * 100, 1)
        
        Write-Host "✓ Created $fileNameNoExt.webp" -ForegroundColor Green
        Write-Host "  $([math]::Round($originalSize, 1)) KB → $([math]::Round($webpSize, 1)) KB (saved $savings%)" -ForegroundColor Gray
    }
}

# Optimize large images
Write-Host "Optimizing Large Images:" -ForegroundColor Cyan
Write-Host "------------------------" -ForegroundColor Cyan

$imagesToOptimize = @(
    "$publicDir/og-image.png",
    "$publicDir/fitness_hero_background.png",
    "$publicDir/workout_hero_bg.png",
    "$publicDir/favicon.png"
)

foreach ($image in $imagesToOptimize) {
    if (Test-Path $image) {
        Optimize-PNG -FilePath $image -Quality $quality
    }
}

Write-Host ""
Write-Host "Creating WebP Versions:" -ForegroundColor Cyan
Write-Host "----------------------" -ForegroundColor Cyan

$imagesToConvert = @(
    "$publicDir/og-image.png",
    "$publicDir/fitness_hero_background.png",
    "$publicDir/workout_hero_bg.png"
)

foreach ($image in $imagesToConvert) {
    if (Test-Path $image) {
        Create-WebP -FilePath $image -Quality 80
    }
}

Write-Host ""
Write-Host "✓ Optimization complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Review optimized images for quality" -ForegroundColor Gray
Write-Host "2. Test on mobile devices" -ForegroundColor Gray
Write-Host "3. Run Lighthouse to verify improvements" -ForegroundColor Gray
Write-Host "4. Original files backed up in: $backupDir" -ForegroundColor Gray
Write-Host ""
