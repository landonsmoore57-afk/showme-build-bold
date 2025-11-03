// Post-build verification: Check pre-rendered HTML files
import fs from 'fs';
import path from 'path';

const dist = path.resolve('dist');

const findHtmlFiles = (dir) => {
  const out = [];
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        out.push(...findHtmlFiles(p));
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        out.push(p);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  return out;
};

const htmls = findHtmlFiles(dist);
const sample = htmls.slice(0, 12);

console.log('\n========================================');
console.log('SSG BUILD VERIFICATION');
console.log('========================================');
console.log(`Total HTML files: ${htmls.length}`);
console.log('\nSample file check:\n');

sample.forEach(f => {
  try {
    const html = fs.readFileSync(f, 'utf8');
    const title = (html.match(/<title>(.*?)<\/title>/i) || [])[1] || '';
    const desc = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i) || [])[1] || '';
    const h1s = (html.match(/<h1[\s>]/gi) || []).length;
    const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) || [])[1] || '';
    const wordCount = html.split(/\s+/).length;
    
    const relativePath = f.replace(dist, '').replace(/\\/g, '/');
    console.log(`📄 ${relativePath}`);
    console.log(`   Title: ${title.slice(0, 60)}${title.length > 60 ? '...' : ''} (${title.length} chars)`);
    console.log(`   Desc: ${desc ? '✓' : '✗'} (${desc.length} chars)`);
    console.log(`   H1s: ${h1s}`);
    console.log(`   Canonical: ${canonical ? '✓' : '✗'}`);
    console.log(`   Words: ${wordCount}`);
    console.log('');
  } catch (err) {
    console.error(`Error reading ${f}:`, err.message);
  }
});

console.log('========================================');
console.log(`✓ Verified ${sample.length} of ${htmls.length} pages`);
console.log('========================================\n');

// Exit with error if no HTML files found
if (htmls.length === 0) {
  console.error('❌ ERROR: No HTML files found in dist/');
  process.exit(1);
}
