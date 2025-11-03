# Static Site Generation (SSG) Build Instructions

This project now supports **static pre-rendering** of all 692+ routes for optimal SEO and crawler compatibility.

## 🎯 What This Solves

- ✅ Unique titles, meta descriptions, H1s visible in static HTML (no JS needed)
- ✅ Improved word count and text-to-HTML ratio
- ✅ Crawler-readable content for SEMrush, Google, and other search engines
- ✅ Faster initial page loads with pre-rendered HTML

## 📦 New Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "routes": "tsx scripts/generate-routes.ts",
    "build:ssr": "vite build --ssr src/entry-server.tsx --outDir dist-ssr",
    "build:ssg": "npm run routes && vite build && npm run build:ssr && vite build",
    "check:ssg": "node scripts/postbuild-check.mjs",
    "preview:ssg": "npx serve dist -p 4173"
  }
}
```

## 🚀 Build Process

### 1. Generate Route List
```bash
npm run routes
```
This creates `.routes.json` with all 692+ routes (cities, services, city×service combinations).

### 2. Build SSG
```bash
npm run build:ssg
```
This will:
1. Generate the routes list
2. Build the client bundle
3. Build the SSR bundle
4. Pre-render all routes to static HTML

### 3. Verify Build
```bash
npm run check:ssg
```
This outputs a summary showing:
- Total HTML files generated
- Sample file analysis (title, description, H1 count, canonical, word count)

### 4. Preview Locally
```bash
npm run preview:ssg
```
Open http://localhost:4173 and view source to confirm static HTML.

## 📁 Key Files Created

### Entry Points
- **`src/entry-client.tsx`** - Client-side hydration entry
- **`src/entry-server.tsx`** - Server-side rendering entry

### Build Tools
- **`scripts/generate-routes.ts`** - Generates route list from data
- **`scripts/postbuild-check.mjs`** - Post-build verification
- **`vite-ssg-plugin.ts`** - Custom Vite plugin for SSG

### Configuration
- **`vite.config.ts`** - Updated with SSG plugin and SSR options
- **`index.html`** - Updated with `<!--app-html-->` placeholder

## 🔍 Testing Pre-Rendered HTML

### Test Without JavaScript (curl)
```bash
# Test homepage
curl -sL https://vitalhomepros.com/ | grep -A 5 "<title>"

# Test city page
curl -sL https://vitalhomepros.com/service-area/mo/overland-park/ | grep -A 5 "<title>"

# Test city×service page
curl -sL https://vitalhomepros.com/service-area/mo/overland-park/ac-repair/ | grep -A 5 "<title>"
```

You should see unique content in each response without any JavaScript execution.

### Browser DevTools
1. Open any page
2. View Page Source (Ctrl+U / Cmd+U)
3. Verify you see the full HTML with:
   - Unique `<title>` tag
   - Proper `<meta name="description">` tag
   - `<link rel="canonical">` tag
   - Rendered content with `<h1>` and body text

## 📊 Expected Results

### Route Count
- Homepage: 1
- Service directory: 1
- Service detail pages: 7
- Service area hub: 1
- State hubs: 2 (MO, KS)
- City pages: 86
- City×Service pages: ~602 (86 cities × 7 services)
- Total: **~700 pages**

### SEO Improvements
- ✅ No duplicate title tags
- ✅ No duplicate meta descriptions
- ✅ Every page has exactly 1 H1
- ✅ Improved word count (300+ words per page)
- ✅ Better text-to-HTML ratio

## 🚢 Deployment

### Static Hosting (Recommended)
Deploy the `dist/` folder to:
- **Vercel**: `vercel deploy --prod`
- **Netlify**: Drag & drop `dist/` folder
- **Cloudflare Pages**: Connect repo with build command `npm run build:ssg`
- **AWS S3 + CloudFront**: Upload `dist/` contents

### Important
- Do **NOT** use SPA fallback/catch-all routing
- Ensure hosting serves pre-rendered HTML files directly
- Keep sitemap.xml in sync with route list

## 🔧 Maintenance

### Adding New Routes
1. Update data in `src/data/seoData.ts` (add cities/services)
2. Run `npm run routes` to regenerate route list
3. Run `npm run build:ssg` to rebuild all pages

### Updating SEO
- SEO logic is in `src/seo/generator.ts`
- Uses `getSEOForRoute(pathname, params)` for dynamic generation
- All pages use `<Helmet>` for meta tags
- Changes automatically reflected in pre-rendered HTML

## 🐛 Troubleshooting

### Routes Not Found
```bash
# Regenerate routes
npm run routes
# Check .routes.json exists and has content
cat .routes.json | wc -l
```

### Missing HTML Files
```bash
# Check dist folder
ls -R dist/ | grep index.html | wc -l
```

### Helmet Tags Not Rendering
- Ensure all page components use `<Helmet>` from `react-helmet-async`
- Verify `getSEOForRoute()` is called in each page
- Check SSR build succeeded: `ls dist-ssr/`

## 📚 References

- [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [Vite SSR Guide](https://vitejs.dev/guide/ssr.html)
- [Static Site Generation Best Practices](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
