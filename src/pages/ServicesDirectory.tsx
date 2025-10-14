import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { services, cities, companyInfo } from "@/data/seoData";

const ServicesDirectory = () => {
  const cityList = Object.entries(cities);
  const serviceList = Object.entries(services);

  return (
    <>
      <Helmet>
        <title>HVAC Services in Missouri & Kansas | Show-Me Air</title>
        <meta 
          name="description" 
          content="Professional HVAC services across Missouri and Kansas. AC repair, furnace installation, maintenance, and more. Serving Columbia, Kansas City, Springfield, St. Louis, and Overland Park." 
        />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Expert HVAC Services Across Missouri & Kansas
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {companyInfo.yearsInBusiness} years of trusted service. Select your service and location below to get started.
            </p>
          </div>
        </section>

        {/* Services by City */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Browse Services by Location</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {cityList.map(([citySlug, cityData]) => (
                <Card key={citySlug} className="p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {cityData.name}, {cityData.state}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Serving {cityData.neighborhoods.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {serviceList.map(([serviceSlug, serviceData]) => (
                      <Link
                        key={serviceSlug}
                        to={`/service-area/${cityData.state.toLowerCase()}/${citySlug}/${serviceSlug}`}
                        className="block"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full justify-between group hover:bg-primary hover:text-white transition-colors"
                        >
                          <span className="font-medium">{serviceData.name}</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceList.map(([serviceSlug, serviceData]) => (
                <Card key={serviceSlug} className="p-6">
                  <h3 className="text-xl font-bold mb-3">{serviceData.name}</h3>
                  <p className="text-muted-foreground mb-4">{serviceData.description}</p>
                  <p className="text-sm font-medium text-primary">
                    Available in all {cityList.length} service areas
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Don't Sweat It — We'll Keep You Cool
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Professional HVAC service with upfront pricing and 100% satisfaction guaranteed.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href={`tel:${companyInfo.phone}`}>
                Call {companyInfo.phone}
              </a>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ServicesDirectory;
