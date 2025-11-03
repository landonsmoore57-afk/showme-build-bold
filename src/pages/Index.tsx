import { Helmet } from "react-helmet-async";
import { getSEOForRoute } from "@/seo/generator";
import { SITE_CONFIG } from "@/data/site";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Commercial } from "@/components/Commercial";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Portfolio } from "@/components/Portfolio";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SpecialOffers } from "@/components/SpecialOffers";
import { JobberContactSection } from "@/components/JobberContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const seoData = getSEOForRoute("/");

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: SITE_CONFIG.brand,
    url: SITE_CONFIG.baseUrl,
    telephone: SITE_CONFIG.phone,
    priceRange: SITE_CONFIG.priceRange,
    areaServed: SITE_CONFIG.areaServed,
  };

  return (
    <div className="min-h-screen">
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
      </Helmet>

      <Navigation />
      <Hero />
      <About />
      <Commercial />
      <Services />
      <Testimonials />
      <Portfolio />
      <WhyChooseUs />
      <div id="offers">
        <SpecialOffers />
      </div>
      <JobberContactSection />
      <Footer />
    </div>
  );
};

export default Index;
