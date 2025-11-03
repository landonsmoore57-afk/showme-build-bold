import fs from 'fs';
import path from 'path';
import { kcMetroCities, SERVICES } from '../src/data/seoData';

const routes = new Set<string>([
  '/',
  '/services',
  '/service-area',
  '/seo-fixes'
]);

// State hubs (MO and KS)
const states = Array.from(new Set(kcMetroCities.map(c => c.state)));
states.forEach((s) => routes.add(`/service-area/${s.toLowerCase()}`));

// City hubs + city x service pages
kcMetroCities.forEach(city => {
  const cityPath = `/service-area/${city.state.toLowerCase()}/${city.slug}`;
  routes.add(cityPath);
  
  SERVICES.forEach(svc => {
    routes.add(`${cityPath}/${svc.slug}`);
  });
});

// Service detail pages
SERVICES.forEach(svc => routes.add(`/services/${svc.slug}`));

const outPath = path.resolve(process.cwd(), '.routes.json');
fs.writeFileSync(outPath, JSON.stringify([...routes], null, 2));
console.log(`✓ Generated ${routes.size} routes → ${outPath}`);
