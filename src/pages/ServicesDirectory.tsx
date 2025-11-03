import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BRAND, SERVICES, kcMetroCities } from "@/data/seoData";
import { getSEOForRoute } from "@/seo/generator";
import { Phone } from "lucide-react";

// Utility Icons
const IconCheck = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPhone = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.31 1.76.57 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.09a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.6.57A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSparkle = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2l2.5 5L20 9.5 15 11l-3 5-3-5-5-1.5L9.5 7 12 2zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PillLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    to={href}
    className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-white hover:shadow transition"
  >
    <span className="mr-1">{children}</span>
    <span className="ml-2 text-slate-400">→</span>
  </Link>
);

const ServicesDirectory = () => {
  const seoData = getSEOForRoute("/services");

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: BRAND.name,
    url: BRAND.baseUrl,
    telephone: BRAND.phone,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC Services",
      itemListElement: SERVICES.map(s => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.label }
      }))
    }
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: seoData.canonical }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <script type="application/ld+json">{JSON.stringify(businessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {seoData.h1}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Professional heating, cooling, and air quality solutions across the Kansas City metro. 
              Fast service, transparent pricing, and expert technicians.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${BRAND.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                <Phone className="w-5 h-5" /> Call {BRAND.phone}
              </a>
              <Link
                to="/service-area/"
                className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition"
              >
                Find Your City
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">What We Do</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              From emergency repairs to new installations, we handle all your HVAC needs with expertise and care.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map(svc => (
                <div key={svc.slug} className="rounded-xl border border-border bg-card p-6 hover:border-primary transition">
                  <h3 className="text-xl font-semibold mb-3">{svc.label}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Professional {svc.label.toLowerCase()} services across the KC metro.
                  </p>
                  <div className="flex gap-3">
                    <Link 
                      to={`/services/${svc.slug}/`}
                      className="flex-1 text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
                    >
                      Learn More
                    </Link>
                    <Link 
                      to="/service-area/"
                      className="flex-1 text-center px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-accent transition"
                    >
                      Find City
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Licensed & Insured", desc: "Certified technicians, background-checked and trained." },
                { title: "Same-Day Service", desc: "Fast response when you need it most." },
                { title: "Transparent Pricing", desc: "Upfront quotes before any work begins." },
                { title: "Satisfaction Guaranteed", desc: "We stand behind every job 100%." },
              ].map((f) => (
                <div key={f.title} className="p-6 rounded-xl border border-border bg-card">
                  <IconSparkle className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Location CTA */}
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-2xl font-bold mb-3">Find Services in Your Area</h2>
            <p className="text-muted-foreground mb-6">
              We serve {kcMetroCities.length}+ cities across Missouri and Kansas
            </p>
            <Link 
              to="/service-area/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Browse All Locations →
            </Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Call now for same-day service or find your city for local details
            </p>
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-lg font-semibold hover:bg-accent transition"
            >
              <Phone className="w-5 h-5" /> Call {BRAND.phone}
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ServicesDirectory;
