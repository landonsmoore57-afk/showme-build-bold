import { kcMetroCities, SERVICES, BRAND } from "./seoData";

export function buildServiceAreaRoutes() {
  const base = "/service-area";
  const cities = kcMetroCities.map(c => `${base}/${c.state.toLowerCase()}/${c.slug}/`);
  const serviceCity = kcMetroCities.flatMap(c => 
    SERVICES.map(s => `${base}/${c.state.toLowerCase()}/${c.slug}/${s.slug}/`)
  );
  const states = ["/service-area/mo/", "/service-area/ks/"];
  return { states, cities, serviceCity, root: ["/service-area/"] };
}

export function buildServicesRoutes() {
  const root = ["/services/"];
  const details = SERVICES.map(s => `/services/${s.slug}/`);
  return { root, details };
}

export function generateSitemapXML() {
  const serviceArea = buildServiceAreaRoutes();
  const services = buildServicesRoutes();
  
  const allUrls = [
    "/",
    ...serviceArea.root,
    ...serviceArea.states,
    ...serviceArea.cities,
    ...serviceArea.serviceCity,
    ...services.root,
    ...services.details
  ];

  const urlset = allUrls.map(path => `
  <url>
    <loc>${BRAND.baseUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "/" ? "1.0" : path.includes("/service-area/") && path.split("/").length === 6 ? "0.8" : "0.7"}</priority>
  </url>`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
}
