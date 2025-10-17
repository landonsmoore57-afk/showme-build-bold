import { writeFileSync } from 'fs';
import { join } from 'path';
import { generateSitemapXML } from '../src/data/sitemap';

const sitemap = generateSitemapXML();
const outputPath = join(process.cwd(), 'public', 'sitemap.xml');

writeFileSync(outputPath, sitemap, 'utf-8');
console.log(`✅ Sitemap generated successfully at ${outputPath}`);
console.log(`📊 Total URLs: ${(sitemap.match(/<url>/g) || []).length}`);
