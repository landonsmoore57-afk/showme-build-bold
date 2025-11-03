import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BRAND, SERVICES, kcMetroCities } from "@/data/seoData";
import { byPriorityCityAlpha } from "@/utils/geo";
import { getSEOForRoute } from "@/seo/generator";
import { Phone } from "lucide-react";

const serviceContent: Record<string, { intro: string; details: string[]; related: string[] }> = {
  "ac-repair": {
    intro: "Fast, reliable AC repair across the Kansas City metro. Our certified technicians diagnose and fix most AC issues same-day, handling everything from refrigerant leaks to compressor failures.",
    details: [
      "Complete system diagnostics",
      "Refrigerant leak detection & repair",
      "Compressor & fan motor replacement",
      "Electrical troubleshooting",
      "Same-day service available",
      "All major brands serviced"
    ],
    related: ["maintenance", "heat-pump"]
  },
  "furnace-repair": {
    intro: "Keep your home warm with expert furnace repair. We troubleshoot and fix heating issues quickly, from ignition problems to blower motor failures, ensuring your family stays comfortable.",
    details: [
      "Heat exchanger inspection",
      "Ignition system repair",
      "Blower motor replacement",
      "Thermostat calibration",
      "Gas line safety checks",
      "24/7 emergency service"
    ],
    related: ["maintenance", "heat-pump"]
  },
  "heat-pump": {
    intro: "High-efficiency heat pump installation and service. We specialize in cold-climate heat pumps that deliver year-round comfort and significant energy savings for Kansas City homes.",
    details: [
      "Cold-climate heat pump installation",
      "Dual-fuel system setup",
      "Refrigerant management",
      "Defrost cycle optimization",
      "Energy efficiency upgrades",
      "Rebate-ready installations"
    ],
    related: ["ac-repair", "furnace-repair"]
  },
  "ductless-mini-splits": {
    intro: "Perfect for additions, renovations, and problem rooms. Ductless mini-split systems provide efficient, zone-controlled heating and cooling without the need for ductwork.",
    details: [
      "Single & multi-zone systems",
      "Custom zone design",
      "Minimal wall penetration",
      "Whisper-quiet operation",
      "Smart control integration",
      "Professional installation"
    ],
    related: ["heat-pump", "indoor-air-quality"]
  },
  "indoor-air-quality": {
    intro: "Breathe easier with professional indoor air quality solutions. We help reduce allergens, dust, and pollutants with advanced filtration, purification, and humidity control systems.",
    details: [
      "HEPA filtration systems",
      "UV air purifiers",
      "Whole-home humidifiers",
      "Dehumidification systems",
      "Duct cleaning services",
      "Air quality testing"
    ],
    related: ["maintenance", "ductless-mini-splits"]
  },
  "maintenance": {
    intro: "Preventive maintenance keeps your HVAC system running efficiently and prevents costly breakdowns. Our comprehensive tune-ups extend equipment life and maintain peak performance.",
    details: [
      "Spring cooling tune-ups",
      "Fall heating tune-ups",
      "Filter replacement",
      "Coil cleaning",
      "Refrigerant level checks",
      "Priority scheduling for members"
    ],
    related: ["ac-repair", "furnace-repair"]
  },
  "emergency-hvac": {
    intro: "HVAC emergencies don't wait for business hours. Our 24/7 emergency service team responds quickly to restore your comfort, day or night, weekends and holidays.",
    details: [
      "24/7 live dispatch",
      "Rapid response times",
      "Temporary heating/cooling solutions",
      "Safety-first diagnostics",
      "Upfront emergency pricing",
      "Parts-stocked service vehicles"
    ],
    related: ["ac-repair", "furnace-repair"]
  }
};

export default function ServiceDetailPage() {
  const { service } = useParams();
  const svc = SERVICES.find(s => s.slug === service);
  
  if (!svc) return <Navigate to="/404" replace />;

  const content = serviceContent[svc.slug] || {
    intro: `Professional ${svc.label.toLowerCase()} services across the Kansas City metro.`,
    details: [],
    related: []
  };

  const topCities = [...kcMetroCities].sort(byPriorityCityAlpha).slice(0, 12);
  const relatedServices = content.related
    .map(slug => SERVICES.find(s => s.slug === slug))
    .filter(Boolean);

  const pathname = `/services/${svc.slug}`;
  const seoData = getSEOForRoute(pathname, { service: svc });

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BRAND.baseUrl}/` },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BRAND.baseUrl}/services/` },
              { "@type": "ListItem", "position": 3, "name": svc.label, "item": seoData.canonical }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": svc.label,
            "provider": {
              "@type": "LocalBusiness",
              "name": BRAND.name,
              "telephone": BRAND.phone,
              "url": BRAND.baseUrl
            },
            "areaServed": topCities.map(c => ({
              "@type": "City",
              "name": `${c.name}, ${c.state.toUpperCase()}`
            })),
            "serviceType": svc.label
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{seoData.h1}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                {content.intro}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a 
                  href={`tel:${BRAND.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  <Phone className="w-5 h-5" />
                  Call {BRAND.phone}
                </a>
                <Link 
                  to="/service-area/"
                  className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition"
                >
                  Find Your City
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        {content.details.length > 0 && (
          <section className="py-16 border-y border-border bg-card/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl font-semibold mb-6 text-center">What's Included</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Top Cities */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-semibold mb-3 text-center">
              {svc.label} in Your City
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Select your location for local service details and pricing
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {topCities.map(c => (
                <Link 
                  key={c.slug}
                  to={`/service-area/${c.state.toLowerCase()}/${c.slug}/${service}/`}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary transition text-center font-medium"
                >
                  {c.name}, {c.state.toUpperCase()}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                to="/service-area/"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                View all service locations →
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl font-semibold mb-6 text-center">Related Services</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedServices.map(related => (
                  <Link
                    key={related.slug}
                    to={`/services/${related.slug}/`}
                    className="p-6 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary transition"
                  >
                    <h3 className="font-semibold mb-2">{related.label}</h3>
                    <span className="text-sm text-primary">Learn more →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Call now for same-day service or find your city for local details
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href={`tel:${BRAND.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-lg font-semibold hover:bg-accent transition"
              >
                <Phone className="w-5 h-5" />
                Call {BRAND.phone}
              </a>
              <Link 
                to="/services/"
                className="px-6 py-3 border border-primary-foreground/30 text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
