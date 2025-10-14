import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuoteDialog } from "@/components/QuoteDialog";
import { Phone, MapPin, CheckCircle2 } from "lucide-react";
import { BRAND, SERVICES, kcMetroCities } from "@/data/seoData";
import { getNearbyCities } from "@/utils/geo";
import { buildIntro, buildEmergency, buildInstall, buildMaintenance, buildIAQ, buildFaqs } from "@/content/generators";
import { useState } from "react";

// Service-specific h1 templates
const serviceH1: Record<string, (city: string, st: string) => string> = {
  "ac-repair": (city, st) => `AC Repair in ${city}, ${st}`,
  "ac-installation": (city, st) => `AC Installation in ${city}, ${st}`,
  "furnace-repair": (city, st) => `Furnace Repair in ${city}, ${st}`,
  "furnace-installation": (city, st) => `Furnace Installation in ${city}, ${st}`,
  "heat-pump": (city, st) => `Heat Pump Service in ${city}, ${st}`,
  "hvac-maintenance": (city, st) => `HVAC Maintenance in ${city}, ${st}`,
  "indoor-air-quality": (city, st) => `Indoor Air Quality in ${city}, ${st}`
};

const ServiceCityPage = () => {
  const { state, city: citySlug, service } = useParams<{ state: string; city: string; service: string }>();
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  
  const svc = SERVICES.find(s => s.slug === service);
  const city = kcMetroCities.find(c => c.state.toUpperCase() === state?.toUpperCase() && c.slug === citySlug);

  if (!svc || !city) {
    return <Navigate to="/404" replace />;
  }

  const nearby = getNearbyCities(kcMetroCities, city, 6);
  const title = `${svc.label} in ${city.name}, ${city.state} | ${BRAND.name}`;
  const description = `${svc.label} in ${city.name}. Fast, local, and transparent. Call ${BRAND.phone}.`;
  const canonical = `${BRAND.baseUrl}/service-area/${state}/${citySlug}/${svc.slug}/`;

  // Generate unique content for this city/service combo
  const h1Text = (serviceH1[svc.slug] || ((c: string, st: string) => `${svc.label} in ${c}, ${st}`))(city.name, city.state);
  const introText = buildIntro(city, svc.slug);
  const emergencyText = buildEmergency(city);
  const installText = buildInstall(city, svc.slug);
  const maintenanceText = buildMaintenance(city);
  const iaqText = buildIAQ(city);
  const faqs = buildFaqs(city, svc.slug);

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
                {h1Text}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {introText}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <a href={BRAND.phoneHref}>
                    <Phone className="h-5 w-5" />
                    Call {BRAND.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setQuoteDialogOpen(true)}>
                  Book Online
                </Button>
              </div>
              
              <QuoteDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
            </div>
          </div>
        </section>

        {/* Service Details - Emergency, Install, Maintenance */}
        <section className="py-16 md:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Emergency Service</h2>
                <p className="text-muted-foreground">{emergencyText}</p>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Install & Replacement</h2>
                <p className="text-muted-foreground">{installText}</p>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Maintenance Plans</h2>
                <p className="text-muted-foreground">{maintenanceText}</p>
              </Card>
              
              {svc.slug === "indoor-air-quality" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Air Quality Solutions</h2>
                  <p className="text-muted-foreground">{iaqText}</p>
                </Card>
              )}
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
        {faqs && faqs.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((f, i) => (
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
