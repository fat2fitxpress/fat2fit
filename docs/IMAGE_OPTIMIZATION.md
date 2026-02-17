# Image Optimization Guide

Best practices and workflows for handling images in the Fat2Fit application.

## Quick Reference

| Image Type | Max Size | Recommended Format | Dimensions |
|------------|----------|-------------------|------------|
| Hero Images | 200 KB | WebP with PNG fallback | 1920x1080 |
| Thumbnails | 50 KB | WebP with PNG fallback | 400x300 |
| Icons | 10 KB | SVG preferred, PNG fallback | 192x192, 512x512 |
| OpenGraph | 300 KB | PNG or JPG | 1200x630 |
| Favicon | 5 KB | PNG | 16x16, 32x32, 192x192, 512x512 |

---

## Image Formats

### SVG (Preferred for Icons/Logos)
**When to use:** Icons, logos, simple graphics

**Pros:**
- ✅ Infinitely scalable
- ✅ Small file size
- ✅ Sharp on all displays
- ✅ Editable with code

**Cons:**
- ❌ Not suitable for photos
- ❌ Complex graphics can be large

### WebP (Recommended for Photos)
**When to use:** Hero images, photos, complex graphics

**Pros:**
- ✅ 25-35% smaller than PNG/JPG
- ✅ Supports transparency
- ✅ Good browser support (95%+)

**Cons:**
- ❌ Requires fallback for old browsers
- ❌ Slightly more complex implementation

### PNG
**When to use:** Transparency needed, fallback images

**Pros:**
- ✅ Lossless compression
- ✅ Supports transparency
- ✅ Universal support

**Cons:**
- ❌ Larger file sizes
- ❌ Not ideal for photos

### JPG
**When to use:** Photographs without transparency

**Pros:**
- ✅ Small file sizes for photos
- ✅ Universal support

**Cons:**
- ❌ No transparency
- ❌ Lossy compression

---

## Optimization Workflow

### For Existing Images

1. **Audit Current Size**
   ```powershell
   Get-ChildItem -Path "public/*.png" | Select-Object Name, @{Name="Size (KB)";Expression={[math]::Round($_.Length/1KB, 2)}}
   ```

2. **Compress PNG/JPG**
   
   **Online Tools:**
   - [TinyPNG](https://tinypng.com/) - Lossy compression
   - [Squoosh](https://squoosh.app/) - Advanced options
   
   **CLI Tools:**
   ```powershell
   # ImageMagick (install via Chocolatey: choco install imagemagick)
   magick input.png -quality 85 -strip output.png
   ```

3. **Convert to WebP**
   ```powershell
   # Using ImageMagick
   magick input.png -quality 80 output.webp
   ```

4. **Verify Quality**
   - Compare file sizes
   - Visually inspect on retina display
   - Test on mobile devices

---

## Next.js Image Component

For new images, use the Next.js `Image` component for automatic optimization:

```tsx
import Image from 'next/image';

// ✅ Good - Automatic optimization
<Image
  src="/hero-image.png"
  alt="Fitness training session"
  width={1920}
  height={1080}
  priority  // For above-the-fold images
  placeholder="blur"
/>

// ❌ Bad - No optimization
<img src="/hero-image.png" alt="Fitness training session" />
```

**Benefits:**
- Automatic WebP conversion
- Lazy loading by default
- Responsive images
- Blur placeholder support

---

## Alt Text Guidelines

### Good Alt Text Examples

```md
<!-- ✅ Good - Descriptive and contextual -->
![Woman performing a deadlift with proper form in a gym](deadlift-form.png)

<!-- ✅ Good - Conveys purpose -->
![Bar chart showing calorie intake vs. expenditure over 7 days](calorie-chart.png)

<!-- ✅ Good - Decorative image -->
![](decorative-pattern.png)  <!-- Empty alt for decorative -->
```

### Bad Alt Text Examples

```md
<!-- ❌ Bad - Too generic -->
![image](workout.png)

<!-- ❌ Bad - Redundant -->
![Image of a woman working out](woman-workout.png)

<!-- ❌ Bad - Filename as alt text -->
![IMG_1234.png](IMG_1234.png)
```

### Alt Text Best Practices

1. **Be Descriptive:** Explain what's in the image
2. **Be Concise:** Aim for 125 characters or less
3. **Provide Context:** Explain why the image matters
4. **Skip Redundancy:** Don't say "image of" or "picture of"
5. **Empty for Decorative:** Use empty alt (`alt=""`) for purely decorative images

---

## Adding New Images

### Step-by-Step Process

1. **Optimize Before Adding**
   - Compress using TinyPNG or Squoosh
   - Convert to WebP if photo
   - Resize to required dimensions

2. **Place in Public Directory**
   ```
   public/
   ├── images/
   │   ├── heroes/      # Hero backgrounds
   │   ├── icons/       # App icons
   │   └── content/     # Content images
   ```

3. **Add to Git**
   ```bash
   git add public/images/your-image.png
   git commit -m "Add hero image for workout page"
   ```

4. **Reference in Code**
   ```tsx
   // For Next.js Image component
   import Image from 'next/image';
   <Image src="/images/heroes/workout.png" alt="..." width={1920} height={1080} />
   
   // For markdown content
   ![Descriptive alt text](/images/content/exercise-example.png)
   ```

---

## File Naming Convention

### Good Names
- ✅ `workout-hero-background.png` - Descriptive, kebab-case
- ✅ `keto-diet-meal-plan.jpg` - Clear purpose
- ✅ `icon-192x192.png` - Includes dimensions

### Bad Names
- ❌ `IMG_1234.png` - Camera default
- ❌ `image (1).png` - Generic with spaces
- ❌ `finalFINAL_v2.png` - Versioning in filename

**Rules:**
- Use lowercase
- Use hyphens (kebab-case)
- Be descriptive
- Include dimensions for icons
- No spaces or special characters

---

## Performance Budget

### Target Metrics

| Page Type | Total Image Size | LCP Image |
|-----------|------------------|-----------|
| Homepage | < 500 KB | < 200 KB |
| Diet/Workout Detail | < 300 KB | < 150 KB |
| Tips Article | < 200 KB | < 100 KB |

**Monitoring:**
- Use Lighthouse to track image performance
- Check Network tab for image sizes
- Monitor Core Web Vitals (LCP)

---

## Current Image Inventory

> **Note:** Current assets in `/public` directory

| File | Size | Status | Action Needed |
|------|------|--------|---------------|
| `favicon.png` | 293 KB | ⚠️ Large | Compress or use smaller sizes |
| `logo.png` | 482 KB | ⚠️ Large | Use SVG version when possible |
| `og-image.png` | 840 KB | ⚠️ Large | Compress to < 300 KB |
| `fitness_hero_background.png` | 569 KB | ⚠️ Large | Compress or convert to WebP |
| `workout_hero_bg.png` | 783 KB | ⚠️ Large | Compress or convert to WebP |
| `logo.svg` | 1.6 KB | ✅ Good | Use this instead of PNG when possible |

**Total:** ~2.97 MB

---

## Tools & Resources

### Compression Tools

**Online:**
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - All formats with preview
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization

**CLI:**
- ImageMagick: `choco install imagemagick`
- Sharp (Node.js): `npm install sharp`

### Testing Tools

- [PageSpeed Insights](https://pagespeed.web.dev/)
- Chrome DevTools > Lighthouse
- [WebPageTest](https://www.webpagetest.org/)

### Learning Resources

- [Web.dev: Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

---

## Common Issues & Solutions

### Issue: Image appears blurry on retina displays

**Solution:** Provide 2x resolution images
```tsx
<Image
  src="/hero.png"
  width={1920}
  height={1080}
  // Actual image should be 3840x2160 (2x)
/>
```

### Issue: Large images slow down page load

**Solution:** 
1. Lazy load below-the-fold images
2. Use Next.js Image component
3. Compress before uploading

### Issue: Images don't load in production

**Solution:**
- Verify images are in `/public` directory
- Check paths don't have leading `/public`
- Ensure images are committed to git

---

## Checklist for New Images

Before adding any image to the project:

- [ ] Image is optimized (compressed)
- [ ] File size is within budget
- [ ] Filename follows naming convention
- [ ] Alt text is descriptive and contextual
- [ ] Image is in correct `/public` subdirectory
- [ ] Using Next.js Image component when possible
- [ ] Tested on mobile and desktop
- [ ] Committed to version control

---

*Last updated: 2026-02-16*
