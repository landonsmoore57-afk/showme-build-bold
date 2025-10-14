import { kcMetroCities, SERVICES } from "./seoData";

export function buildServiceAreaRoutes() {
  const base = "/service-area";
  
  const root = [`${base}/`];
  
  const states = [`${base}/mo/`, `${base}/ks/`];
  
  const cities = kcMetroCities.map(c => 
    `${base}/${c.state.toLowerCase()}/${c.slug}/`
  );
  
  const serviceCity = kcMetroCities.flatMap(c => 
    SERVICES.map(s => 
      `${base}/${c.state.toLowerCase()}/${c.slug}/${s.slug}/`
    )
  );
  
  return { 
    root, 
    states, 
    cities, 
    serviceCity,
    all: [...root, ...states, ...cities, ...serviceCity]
  };
}

// Helper to generate sitemap.xml content
export function generateSitemapXML(baseUrl: string) {
  const routes = buildServiceAreaRoutes();
  const urls = routes.all.map(route => 
    `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/service-area/' ? '0.9' : route.includes('/service-area/mo/') || route.includes('/service-area/ks/') ? '0.8' : '0.7'}</priority>
  </url>`
  ).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
