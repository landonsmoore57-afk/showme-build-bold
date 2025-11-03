import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';
import { fileURLToPath } from 'url';

export function viteSSGPlugin(): Plugin {
  return {
    name: 'vite-ssg-plugin',
    apply: 'build',
    closeBundle: async () => {
      const routesPath = path.resolve(process.cwd(), '.routes.json');
      
      if (!fs.existsSync(routesPath)) {
        console.error('❌ .routes.json not found. Run npm run routes first.');
        return;
      }
      
      const routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
      const distPath = path.resolve(process.cwd(), 'dist');
      const distSSRPath = path.resolve(process.cwd(), 'dist-ssr');
      const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
      
      // Import the server entry dynamically
      const serverEntryPath = path.join(distSSRPath, 'entry-server.js');
      const { render } = await import(fileURLToPath(new URL(`file://${serverEntryPath}`)));
      
      console.log(`\n🔨 Pre-rendering ${routes.length} routes...\n`);
      
      let processed = 0;
      for (const route of routes) {
        try {
          const { html, helmet } = render(route);
          
          // Inject rendered HTML and helmet tags
          let finalHtml = template
            .replace('<!--app-html-->', html)
            .replace('<title>Loading...</title>', helmet.title.toString())
            .replace('<meta name="description" content="" />', helmet.meta.toString());
          
          // Add any other helmet tags
          if (helmet.link) {
            finalHtml = finalHtml.replace('</head>', `${helmet.link.toString()}</head>`);
          }
          
          // Determine output path
          const outputPath = route === '/' 
            ? path.join(distPath, 'index.html')
            : path.join(distPath, route, 'index.html');
          
          // Create directory if needed
          const dir = path.dirname(outputPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          
          // Write the file
          fs.writeFileSync(outputPath, finalHtml);
          processed++;
          
          if (processed % 50 === 0) {
            console.log(`  ✓ ${processed}/${routes.length} routes processed...`);
          }
        } catch (err) {
          console.error(`❌ Error rendering ${route}:`, err);
        }
      }
      
      console.log(`\n✅ Pre-rendered ${processed} routes successfully!\n`);
    }
  };
}
