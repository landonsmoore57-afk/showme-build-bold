import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { JobberDialog } from "@/components/JobberDialog";
import { Phone, MapPin, CheckCircle2 } from "lucide-react";
import { BRAND, SERVICES, kcMetroCities } from "@/data/seoData";
import { getNearbyCities } from "@/utils/geo";
import { getSEOForRoute } from "@/seo/generator";
import { ServiceCityContent } from "@/components/SEO/ServiceCityContent";
import { useState } from "react";

const ServiceCityPage = () => {
  const { state, city: citySlug, service } = useParams<{ state: string; city: string; service: string }>();
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  
  const svc = SERVICES.find(s => s.slug === service);
  const city = kcMetroCities.find(c => c.state.toUpperCase() === state?.toUpperCase() && c.slug === citySlug);

  if (!svc || !city) {
    return <Navigate to="/404" replace />;
  }

  const nearby = getNearbyCities(kcMetroCities, city, 6);
  const pathname = `/service-area/${state}/${citySlug}/${svc.slug}`;
  const seoData = getSEOForRoute(pathname, { city, service: svc, state: state?.toUpperCase() });

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.baseUrl },
      { "@type": "ListItem", position: 2, name: "Service Area", item: `${BRAND.baseUrl}/service-area/` },
      { "@type": "ListItem", position: 3, name: state?.toUpperCase(), item: `${BRAND.baseUrl}/service-area/${state}/` },
      { "@type": "ListItem", position: 4, name: city.name, item: `${BRAND.baseUrl}/service-area/${state}/${citySlug}/` },
      { "@type": "ListItem", position: 5, name: svc.label, item: seoData.canonical }
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
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
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
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-background pt-32 pb-16 md:pt-40 md:pb-24">
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
                <span className="text-foreground">{svc.label}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {seoData.h1}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Fast, reliable {svc.label.toLowerCase()} in {city.name}, {city.state}. Licensed professionals, transparent pricing, 24/7 emergency service.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <a href={`tel:${BRAND.phone.replace(/\D/g, '')}`}>
                    <Phone className="h-5 w-5" />
                    Call {BRAND.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setQuoteDialogOpen(true)}>
                  Schedule Service
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="border-y bg-card/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {["Same-Day Service", "Licensed & Insured", "Upfront Pricing", "100% Satisfaction"].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rich SEO Content Component - 400-800 words */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <ServiceCityContent 
              city={city} 
              service={svc}
              showFAQ={true}
              showNeighborhoods={true}
              showSeasonalTips={true}
            />
          </div>
        </section>

        {/* Nearby Cities */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              We Also Serve Nearby Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  to={`/service-area/${n.state.toLowerCase()}/${n.slug}/${svc.slug}/`}
                  className="text-center p-4 bg-background border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="font-medium">{n.name}</div>
                  <div className="text-sm text-muted-foreground">{n.county} Co.</div>
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
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href={BRAND.phoneHref}>
                  <Phone className="h-5 w-5" />
                  {BRAND.phone}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all" 
                onClick={() => setQuoteDialogOpen(true)}
              >
                Schedule Online
              </Button>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to={`/service-area/${state}/${citySlug}/`} className="text-primary hover:underline">
              ← Back to {city.name} Service Area
            </Link>
          </div>
        </section>
      </main>

      <JobberDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
      <Footer />
    </>
  );
};

export default ServiceCityPage;
