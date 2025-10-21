import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { kcMetroCities, companyInfo } from "@/data/seoData";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

const StateHubPage = () => {
  const { state } = useParams<{ state: string }>();

  if (!state || !["mo", "ks"].includes(state.toLowerCase())) {
    return <Navigate to="/404" replace />;
  }

  const stateUpper = state.toUpperCase();
  const stateName = stateUpper === "MO" ? "Missouri" : "Kansas";
  
  const stateCities = kcMetroCities
    .filter(c => c.state === stateUpper)
    .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

  // Group by county
  const citiesByCounty = stateCities.reduce((acc, city) => {
    if (!acc[city.county]) acc[city.county] = [];
    acc[city.county].push(city);
    return acc;
  }, {} as Record<string, typeof stateCities>);

  const pageTitle = `HVAC Services in ${stateName} | ${companyInfo.name}`;
  const metaDescription = `Expert HVAC in ${stateName} — ${stateCities.slice(0, 3).map(c => c.name).join(", ")} & more. Fast AC & furnace repair. Call ${companyInfo.phone}.`;
  const canonicalUrl = `${companyInfo.website}/service-area/${state.toLowerCase()}/`;

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: companyInfo.website },
      { "@type": "ListItem", position: 2, name: "Service Area", item: `${companyInfo.website}/service-area/` },
      { "@type": "ListItem", position: 3, name: stateName, item: canonicalUrl }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsJsonLd)}
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
                  {stateCities.length} Cities Served
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {stateName} <span className="text-primary">Service Area</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Professional HVAC services across {stateName}. Fast AC & furnace repair, installations, and 24/7 emergency service.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}>
                    <Phone className="h-5 w-5" />
                    Call {companyInfo.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline">
                  Find Your City
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cities */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Featured Cities in {stateName}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {stateCities.filter(c => c.priority === 1).map((city) => (
                <a
                  key={city.slug}
                  href={`/service-area/${state.toLowerCase()}/${city.slug}/`}
                  className="bg-card rounded-xl p-6 border hover:border-primary transition-colors group"
                >
                  <MapPin className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{city.county} County</p>
                  {city.neighborhoods.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {city.neighborhoods.slice(0, 3).join(" • ")}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* All Cities by County */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              All Service Locations in {stateName}
            </h2>
            
            <div className="max-w-6xl mx-auto space-y-8">
              {Object.entries(citiesByCounty)
                .sort(([countyA], [countyB]) => countyA.localeCompare(countyB))
                .map(([county, cities]) => (
                  <div key={county} className="bg-background rounded-xl p-6 border">
                    <h3 className="text-2xl font-semibold mb-4">{county} County</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {cities.map((city) => (
                        <a
                          key={city.slug}
                          href={`/service-area/${state.toLowerCase()}/${city.slug}/`}
                          className="text-center p-3 bg-card border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          <div className="font-medium text-sm">{city.name}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need HVAC Service in {stateName}?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Select your city above or call us now for fast, reliable service.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}>
                <Phone className="h-5 w-5" />
                {companyInfo.phone}
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default StateHubPage;
