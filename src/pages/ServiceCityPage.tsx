import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Star, 
  Phone, 
  MapPin, 
  Award,
  Shield,
  Clock,
  ThumbsUp
} from "lucide-react";
import { companyInfo, services, cities, proofPoints, faqs } from "@/data/seoData";

const ServiceCityPage = () => {
  const { service, city } = useParams<{ service: string; city: string }>();

  // Validate service and city
  if (!service || !city || !services[service as keyof typeof services] || !cities[city as keyof typeof cities]) {
    return <Navigate to="/404" replace />;
  }

  const serviceData = services[service as keyof typeof services];
  const cityData = cities[city as keyof typeof cities];
  const serviceFaqs = faqs[service as keyof typeof faqs] || [];

  const pageTitle = `${serviceData.name} in ${cityData.name}, ${cityData.state} – Fast, Reliable Service You Can Trust`;
  const metaDescription = `Expert ${serviceData.name.toLowerCase()} in ${cityData.name}, ${cityData.state}. ${companyInfo.yearsInBusiness} years of trusted service. Licensed, insured, and locally operated. Call ${companyInfo.phone} for same-day service.`;
  const canonicalUrl = `${companyInfo.website}/service-area/${cityData.state.toLowerCase()}/${city}/${service}`;

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": companyInfo.name,
    "url": canonicalUrl,
    "logo": companyInfo.logo,
    "telephone": companyInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "postalCode": cityData.zipCodes[0]
    },
    "areaServed": cityData.neighborhoods,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceData.name} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceData.name,
            "description": serviceData.description,
            "areaServed": cityData.name
          }
        }
      ]
    },
    "openingHours": companyInfo.serviceHours,
    "sameAs": [
      companyInfo.socialMedia.google,
      companyInfo.socialMedia.facebook
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": companyInfo.rating.value,
      "reviewCount": companyInfo.rating.count
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": serviceFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        {serviceFaqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(faqStructuredData)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>{cityData.state}</span>
              <span>›</span>
              <span>{cityData.name}</span>
              <span>›</span>
              <span>{serviceData.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {serviceData.name} in {cityData.name}, {cityData.state}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              Trusted {serviceData.category} service backed by {companyInfo.yearsInBusiness} years of experience. 
              Licensed, insured, and proudly serving {cityData.name} and surrounding neighborhoods with 
              honest, expert service — and a smile.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={scrollToContact} className="gap-2">
                <Phone className="h-5 w-5" />
                Schedule Service Now
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToContact}>
                Get Free Quote
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <Card className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-primary fill-primary" />
                <div className="font-bold">{companyInfo.rating.value} Stars</div>
                <div className="text-sm text-muted-foreground">{companyInfo.rating.count} Reviews</div>
              </Card>
              <Card className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-bold">24/7 Service</div>
                <div className="text-sm text-muted-foreground">Always Available</div>
              </Card>
              <Card className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-bold">Licensed</div>
                <div className="text-sm text-muted-foreground">{companyInfo.licenseNumber}</div>
              </Card>
              <Card className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-bold">{companyInfo.yearsInBusiness} Years</div>
                <div className="text-sm text-muted-foreground">Serving Missouri</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Local Context */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-6">
              Expert {serviceData.name} for {cityData.name} Homeowners
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {cityData.weatherFacts} That's why reliable HVAC service isn't just a luxury — it's essential.
              Our team knows the unique challenges {cityData.name} homes face, and we're ready to help.
            </p>
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <ThumbsUp className="h-5 w-5" />
                Available Rebates & Savings
              </h3>
              <p>{cityData.rebates}</p>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">
              Common {serviceData.name} Problems We Fix
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {serviceData.commonIssues.map((issue, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg">{issue}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">
              Why Choose {companyInfo.name}?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {proofPoints.map((point, index) => (
                <Card key={index} className="p-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold text-lg">{point}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-6">
              Serving {cityData.name} & Surrounding Areas
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're proud to serve homeowners throughout {cityData.name} and nearby neighborhoods, including:
            </p>
            <div className="flex flex-wrap gap-3">
              {cityData.neighborhoods.map((neighborhood, index) => (
                <span key={index} className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium">
                  {neighborhood}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-muted-foreground">
                Also serving nearby cities. Call us at{' '}
                <a href={`tel:${companyInfo.phone}`} className="text-primary font-bold hover:underline">
                  {companyInfo.phone}
                </a>{' '}
                to confirm service availability in your area.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {serviceFaqs.length > 0 && (
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {serviceFaqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-bold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section id="contact" className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready for Reliable Comfort in {cityData.name}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Don't sweat it — we've got you covered. Call us today for fast, friendly service.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href={`tel:${companyInfo.phone}`}>
                  <Phone className="h-5 w-5" />
                  {companyInfo.phone}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                Schedule Online
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ServiceCityPage;
