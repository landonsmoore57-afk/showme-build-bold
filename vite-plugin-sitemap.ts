import type { Plugin } from 'vite';
import { generateSitemapXML } from './src/data/sitemap';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    closeBundle() {
      const sitemap = generateSitemapXML();
      const distPath = join(process.cwd(), 'dist', 'sitemap.xml');
      
      // Ensure dist directory exists
      mkdirSync(join(process.cwd(), 'dist'), { recursive: true });
      
      // Write sitemap
      writeFileSync(distPath, sitemap, 'utf-8');
      
      const urlCount = (sitemap.match(/<url>/g) || []).length;
      console.log(`\n✅ Sitemap generated: ${urlCount} URLs\n`);
    }
  };
}
