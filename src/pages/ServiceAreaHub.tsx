import { Helmet } from "react-helmet-async";
import { kcMetroCities, companyInfo } from "@/data/seoData";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { JobberDialog } from "@/components/JobberDialog";
import { MapPin, Phone, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const ServiceAreaHub = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const moFeatured = kcMetroCities.filter(c => c.state === "MO" && c.priority === 1);
  const ksFeatured = kcMetroCities.filter(c => c.state === "KS" && c.priority === 1);
  
  const pageTitle = `Kansas City Metro Service Area | ${companyInfo.name}`;
  const metaDescription = "Full HVAC service coverage across the Kansas City metro—Missouri & Kansas. Same-day AC & furnace repair in 100+ cities.";
  const canonicalUrl = `${companyInfo.website}/service-area/`;

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: companyInfo.name,
    url: companyInfo.website,
    telephone: companyInfo.phone,
    areaServed: [
      { "@type": "State", name: "Missouri" },
      { "@type": "State", name: "Kansas" }
    ],
    serviceType: ["HVAC", "AC Repair", "Furnace Repair", "Heat Pump", "HVAC Maintenance"]
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: companyInfo.website },
      { "@type": "ListItem", position: 2, name: "Service Area", item: canonicalUrl }
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
          {JSON.stringify(businessJsonLd)}
        </script>
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
                  Serving {kcMetroCities.length}+ Cities Across MO & KS
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Kansas City Metro <span className="text-primary">Service Area</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Professional HVAC services across Missouri and Kansas. Fast AC & furnace repair, installations, and 24/7 emergency service in your neighborhood.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}>
                    <Phone className="h-5 w-5" />
                    Call {companyInfo.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline">
                  Find Your City Below
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="border-y bg-card/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>24/7 Emergency Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>100+ Cities Served</span>
              </div>
            </div>
          </div>
        </section>

        {/* State Cards */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Select Your State
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Missouri Card */}
              <div className="bg-card rounded-2xl p-8 border hover:border-primary transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">Missouri</h3>
                  <MapPin className="h-10 w-10 text-primary" />
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Serving {kcMetroCities.filter(c => c.state === "MO").length} cities across Jackson, Clay, Platte, and Cass counties.
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-sm uppercase tracking-wide">Featured Cities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {moFeatured.map(city => (
                      <a
                        key={city.slug}
                        href={`/service-area/mo/${city.slug}/`}
                        className="text-sm px-3 py-2 bg-background border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
                      >
                        {city.name}
                      </a>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline" asChild>
                  <a href="/service-area/mo/">View All Missouri Cities →</a>
                </Button>
              </div>

              {/* Kansas Card */}
              <div className="bg-card rounded-2xl p-8 border hover:border-primary transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">Kansas</h3>
                  <MapPin className="h-10 w-10 text-primary" />
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Serving {kcMetroCities.filter(c => c.state === "KS").length} cities across Johnson, Wyandotte, Leavenworth, and Miami counties.
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-sm uppercase tracking-wide">Featured Cities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {ksFeatured.map(city => (
                      <a
                        key={city.slug}
                        href={`/service-area/ks/${city.slug}/`}
                        className="text-sm px-3 py-2 bg-background border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
                      >
                        {city.name}
                      </a>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline" asChild>
                  <a href="/service-area/ks/">View All Kansas Cities →</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why KC Metro Trusts {companyInfo.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                <p className="text-muted-foreground">
                  We understand the unique climate challenges of the KC metro area.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
                <p className="text-muted-foreground">
                  Same-day service available across 100+ cities in MO & KS.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Honest Pricing</h3>
                <p className="text-muted-foreground">
                  Upfront quotes with no hidden fees or surprise charges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Better HVAC Service?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Find your city above or call us now to schedule service anywhere in the Kansas City metro.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}>
                  <Phone className="h-5 w-5" />
                  {companyInfo.phone}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] animate-pulse" 
                onClick={() => setQuoteDialogOpen(true)}
              >
                Schedule Online
              </Button>
            </div>
          </div>
        </section>

        <JobberDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
      </main>

      <Footer />
    </>
  );
};

export default ServiceAreaHub;
