import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { kcMetroCities, companyInfo, proofPoints, SERVICES } from "@/data/seoData";
import { getNearbyCities } from "@/utils/geo";
import { buildCityIntro } from "@/content/generators";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";

const CityPage = () => {
  const { state, city: citySlug } = useParams<{ state: string; city: string }>();

  const cityData = kcMetroCities.find(
    c => c.slug === citySlug && c.state.toLowerCase() === state?.toLowerCase()
  );

  if (!cityData) {
    return <Navigate to="/404" replace />;
  }

  const pageTitle = `${cityData.name}, ${cityData.state} HVAC — AC & Furnace Repair | ${companyInfo.name}`;
  const metaDescription = `Trusted HVAC in ${cityData.name}, ${cityData.state}. Fast AC & furnace repair, installs, maintenance, and emergency service. Call ${companyInfo.phone} today.`;
  const canonicalUrl = `${companyInfo.website}/service-area/${cityData.state.toLowerCase()}/${cityData.slug}/`;

  // Get nearby cities using geographic logic
  const nearbyCities = getNearbyCities(kcMetroCities, cityData, 8);

  // Generate unique intro for this city
  const cityIntro = buildCityIntro(cityData);

  // JSON-LD structured data
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: companyInfo.name,
    url: canonicalUrl,
    telephone: companyInfo.phone,
    areaServed: {
      "@type": "City",
      name: cityData.name,
      containedIn: {
        "@type": "AdministrativeArea",
        name: `${cityData.county} County, ${cityData.state}`
      }
    },
    serviceType: ["HVAC", "AC Repair", "Furnace Repair", "Heat Pump", "Ductless Mini-Split", "HVAC Maintenance"],
    priceRange: "$$"
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: companyInfo.website },
      { "@type": "ListItem", position: 2, name: "Service Area", item: `${companyInfo.website}/service-area/` },
      { "@type": "ListItem", position: 3, name: cityData.state, item: `${companyInfo.website}/service-area/${cityData.state.toLowerCase()}/` },
      { "@type": "ListItem", position: 4, name: cityData.name, item: canonicalUrl }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do you offer same-day HVAC service in ${cityData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes—subject to availability. Call for today's openings."
        }
      },
      {
        "@type": "Question",
        name: `Do you service heat pumps in ${cityData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `We repair, install, and maintain heat pumps across ${cityData.name}.`
        }
      }
    ]
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(businessJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  Serving {cityData.name}, {cityData.state} • {cityData.county} County
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                HVAC Services in <span className="text-primary">{cityData.name}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {cityIntro}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={scrollToContact} className="gap-2">
                  <Phone className="h-5 w-5" />
                  Call {companyInfo.phone}
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToContact}>
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
              {proofPoints.slice(0, 4).map((point, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Services in {cityData.name}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  to={`/service-area/${state}/${citySlug}/${service.slug}/`}
                  className="bg-card rounded-xl p-6 border hover:border-primary transition-colors group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Professional {service.label.toLowerCase()} services
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Service */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                24/7 Emergency HVAC in {cityData.name}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                HVAC emergencies don't wait for business hours. Our {cityData.name} team is available 24/7/365 for urgent repairs.
              </p>
              <Button size="lg" onClick={scrollToContact}>
                Get Emergency Service
              </Button>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        {cityData.neighborhoods.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">
                Neighborhoods We Serve in {cityData.name}
              </h2>
              <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
                {cityData.neighborhoods.map((neighborhood, idx) => (
                  <div key={idx} className="px-4 py-2 bg-card border rounded-full text-sm">
                    {neighborhood}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Nearby Cities */}
        {nearbyCities.length > 0 && (
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">
                We Also Serve Nearby Cities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    to={`/service-area/${nearbyCity.state.toLowerCase()}/${nearbyCity.slug}/`}
                    className="text-center p-4 bg-background border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="font-medium">{nearbyCity.name}</div>
                    <div className="text-sm text-muted-foreground">{nearbyCity.county} Co.</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose {companyInfo.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {proofPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Context */}
        {cityData.rebates && (
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Rebates & Incentives</h2>
                <p className="text-muted-foreground">{cityData.rebates}</p>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section id="contact" className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Service in {cityData.name}?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Call us now or schedule online for fast, reliable HVAC service.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2">
                <Phone className="h-5 w-5" />
                {companyInfo.phone}
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Schedule Online
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CityPage;
