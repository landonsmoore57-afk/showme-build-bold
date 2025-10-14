import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MapPin, CheckCircle2 } from "lucide-react";
import { BRAND, SERVICES, kcMetroCities } from "@/data/seoData";
import { getNearbyCities } from "@/utils/geo";

// Service-specific copy templates
const serviceCopy: Record<string, {
  h1: (city: string, st: string) => string;
  intro: (city: string) => string;
  faq: { q: string; a: string }[];
}> = {
  "ac-repair": {
    h1: (city, st) => `AC Repair in ${city}, ${st}`,
    intro: (city) => `Fast diagnostics, honest quotes, and same-day fixes for most brands—serving ${city} homes and light commercial.`,
    faq: [
      { q: "Do you offer same-day AC repair?", a: "Yes, subject to availability. Call and we'll slot you in as soon as possible." },
      { q: "Do you service all brands?", a: "We repair most major brands and carry common parts on trucks." }
    ]
  },
  "ac-installation": {
    h1: (city, st) => `AC Installation in ${city}, ${st}`,
    intro: (city) => `Professional AC installation with proper sizing and expert workmanship for ${city} homes and businesses.`,
    faq: [
      { q: "How long does installation take?", a: "Most installations complete in one day. We'll give you an accurate timeline during the estimate." },
      { q: "What size AC unit do I need?", a: "Our technicians perform a detailed load calculation to ensure the perfect size for maximum efficiency." }
    ]
  },
  "furnace-repair": {
    h1: (city, st) => `Furnace Repair in ${city}, ${st}`,
    intro: (city) => `No-heat, strange noises, or short cycling? We troubleshoot furnaces quickly in ${city} and nearby.`,
    faq: [
      { q: "Emergency furnace repair?", a: "Yes—24/7 during heating season." },
      { q: "Old furnace—repair or replace?", a: "We'll give you the repair option first and a clear replacement quote if it makes more sense." }
    ]
  },
  "furnace-installation": {
    h1: (city, st) => `Furnace Installation in ${city}, ${st}`,
    intro: (city) => `Complete furnace installation and replacement services for ${city} homeowners. Energy-efficient options available.`,
    faq: [
      { q: "When should I replace my furnace?", a: "If your furnace is over 15 years old, requires frequent repairs, or your energy bills are rising, replacement is often more cost-effective." },
      { q: "Do you handle permits?", a: "Yes! We handle all permits, inspections, and code compliance." }
    ]
  },
  "heat-pump": {
    h1: (city, st) => `Heat Pump Service in ${city}, ${st}`,
    intro: (city) => `Repairs, tune-ups, and high-efficiency heat pump installs tailored to ${city}'s climate swings.`,
    faq: [
      { q: "Do you install cold-climate heat pumps?", a: "Yes. We'll match equipment to your home and budget." }
    ]
  },
  "hvac-maintenance": {
    h1: (city, st) => `HVAC Maintenance in ${city}, ${st}`,
    intro: (city) => `Seasonal tune-ups that keep systems efficient and catch issues early for ${city} homeowners.`,
    faq: [
      { q: "Do you have memberships?", a: "Yes—priority scheduling, discounts, and reminders." },
      { q: "How often should I service my HVAC?", a: "We recommend twice yearly: once before cooling season and once before heating season." }
    ]
  },
  "indoor-air-quality": {
    h1: (city, st) => `Indoor Air Quality in ${city}, ${st}`,
    intro: (city) => `Filters, UV, and air cleaners to reduce dust and allergens for ${city} homes.`,
    faq: [
      { q: "Do you test IAQ?", a: "We can assess common IAQ issues and recommend solutions." },
      { q: "What are signs of poor air quality?", a: "Excessive dust, odors, respiratory irritation, humidity problems, and frequent allergy symptoms." }
    ]
  }
};

const ServiceCityPage = () => {
  const { state, city: citySlug, service } = useParams<{ state: string; city: string; service: string }>();
  
  const svc = SERVICES.find(s => s.slug === service);
  const city = kcMetroCities.find(c => c.state.toUpperCase() === state?.toUpperCase() && c.slug === citySlug);

  if (!svc || !city) {
    return <Navigate to="/404" replace />;
  }

  const nearby = getNearbyCities(kcMetroCities, city, 6);
  const title = `${svc.label} in ${city.name}, ${city.state} | ${BRAND.name}`;
  const description = `${svc.label} in ${city.name}. Fast, local, and transparent. Call ${BRAND.phone}.`;
  const canonical = `${BRAND.baseUrl}/service-area/${state}/${citySlug}/${svc.slug}/`;

  const copy = serviceCopy[svc.slug] || {
    h1: (c: string, st: string) => `${svc.label} in ${c}, ${st}`,
    intro: (c: string) => `${svc.label} for homeowners in ${c}.`,
    faq: []
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.baseUrl },
      { "@type": "ListItem", position: 2, name: "Service Area", item: `${BRAND.baseUrl}/service-area/` },
      { "@type": "ListItem", position: 3, name: state?.toUpperCase(), item: `${BRAND.baseUrl}/service-area/${state}/` },
      { "@type": "ListItem", position: 4, name: city.name, item: `${BRAND.baseUrl}/service-area/${state}/${citySlug}/` },
      { "@type": "ListItem", position: 5, name: svc.label, item: canonical }
    ]
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    telephone: BRAND.phone,
    url: BRAND.baseUrl,
    areaServed: [city.name, `${city.county} County`, city.state],
    serviceType: svc.label
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessJsonLd)}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <Link to="/service-area/" className="hover:text-primary">Service Area</Link>
                <span>›</span>
                <Link to={`/service-area/${state}/`} className="hover:text-primary">{state?.toUpperCase()}</Link>
                <span>›</span>
                <Link to={`/service-area/${state}/${citySlug}/`} className="hover:text-primary">{city.name}</Link>
                <span>›</span>
                <span>{svc.label}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {copy.h1(city.name, city.state)}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {copy.intro(city.name)}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <a href={BRAND.phoneHref}>
                    <Phone className="h-5 w-5" />
                    Call {BRAND.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline">
                  Book Online
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What's Included</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Licensed, insured technicians</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Transparent, upfront pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Parts & labor warranty</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Most brands serviced</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Availability</h2>
                <p className="text-muted-foreground">
                  Same-day service available in many cases. 24/7 emergency service for critical heating and cooling issues.
                </p>
                <p className="text-muted-foreground mt-4">
                  {BRAND.hours}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        {city.neighborhoods && city.neighborhoods.length > 0 && (
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Neighborhoods We Serve in {city.name}
              </h2>
              <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                {city.neighborhoods.map((n) => (
                  <span key={n} className="px-4 py-2 bg-card border rounded-lg text-sm font-medium">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {copy.faq.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {copy.faq.map((f, i) => (
                    <Card key={i} className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                      <p className="text-muted-foreground">{f.a}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Nearby Cities */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              We Also Serve Nearby Cities
            </h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  to={`/service-area/${n.state.toLowerCase()}/${n.slug}/${svc.slug}/`}
                  className="px-4 py-2 bg-card border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium"
                >
                  {n.name}, {n.state}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need {svc.label} in {city.name}?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Don't wait—call us today for fast, reliable service from licensed professionals.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <a href={BRAND.phoneHref}>
                <Phone className="h-5 w-5" />
                {BRAND.phone}
              </a>
            </Button>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Link to={`/service-area/${state}/${citySlug}/`} className="text-primary hover:underline">
              ← Back to {city.name} Service Area
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServiceCityPage;
