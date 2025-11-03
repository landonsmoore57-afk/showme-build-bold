import { CityData, SERVICES } from "@/data/seoData";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, Clock, Shield, Star } from "lucide-react";

interface ServiceCityContentProps {
  city: CityData;
  service?: { slug: string; label: string };
  showFAQ?: boolean;
  showNeighborhoods?: boolean;
  showSeasonalTips?: boolean;
}

/**
 * Rich, SEO-optimized content component for city/service pages
 * Target: 400-800 words of scannable, helpful text
 * Improves word count and text-to-HTML ratio
 */
export function ServiceCityContent({
  city,
  service,
  showFAQ = true,
  showNeighborhoods = true,
  showSeasonalTips = true,
}: ServiceCityContentProps) {
  const serviceName = service?.label || "HVAC";
  const cityName = city.name;
  const stateName = city.state === "MO" ? "Missouri" : "Kansas";

  // Common issues based on service type
  const getCommonIssues = () => {
    if (!service) return [];
    
    const issuesMap: Record<string, string[]> = {
      "ac-repair": [
        "AC unit not cooling properly",
        "Strange noises from outdoor unit",
        "Frozen evaporator coils",
        "High humidity indoors",
        "Thermostat malfunctions",
        "Refrigerant leaks",
      ],
      "ac-installation": [
        "Outdated, inefficient system",
        "Undersized or oversized unit",
        "Poor airflow distribution",
        "Skyrocketing energy bills",
        "Frequent breakdowns",
      ],
      "furnace-repair": [
        "No heat or weak heating",
        "Pilot light issues",
        "Strange burning smells",
        "Yellow pilot flame (safety hazard)",
        "Frequent cycling on and off",
        "Loud banging or rumbling",
      ],
      "furnace-installation": [
        "Furnace over 15-20 years old",
        "Rising heating costs",
        "Uneven heating throughout home",
        "Carbon monoxide concerns",
        "Frequent repair needs",
      ],
      "heat-pump": [
        "Heat pump not switching modes",
        "Ice buildup on outdoor unit",
        "Insufficient heating or cooling",
        "Auxiliary heat running constantly",
        "Unusual noises during operation",
      ],
      "hvac-maintenance": [
        "Reduced system efficiency",
        "Unexpected breakdowns",
        "Poor indoor air quality",
        "Shortened equipment lifespan",
        "Higher utility bills",
      ],
      "indoor-air-quality": [
        "Excessive dust buildup",
        "Persistent allergens",
        "High humidity or dryness",
        "Stale or musty odors",
        "Mold or mildew concerns",
        "Respiratory irritation",
      ],
    };

    return issuesMap[service.slug] || [];
  };

  // Get related services
  const relatedServices = SERVICES.filter(s => s.slug !== service?.slug).slice(0, 3);

  return (
    <div className="prose prose-slate max-w-none">
      {/* Introduction - What we do */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Professional {serviceName} in {cityName}, {stateName}
        </h2>
        <p className="text-base leading-relaxed mb-4">
          When you need reliable {serviceName.toLowerCase()} in {cityName}, Vital Home Pros delivers fast, 
          professional service you can trust. Our licensed HVAC technicians serve homeowners throughout {city.county} County 
          with same-day appointments, upfront pricing, and a 100% satisfaction guarantee. Whether you're facing an emergency 
          breakdown or planning a routine service, we're here to help.
        </p>
        <p className="text-base leading-relaxed">
          We understand that {cityName} residents face unique heating and cooling challenges. {city.weatherFacts || 
          "The Kansas City metro area experiences hot, humid summers and cold winters."} That's why we offer 
          comprehensive {serviceName.toLowerCase()} designed to keep your home comfortable year-round while 
          maximizing energy efficiency.
        </p>
      </section>

      {/* What's Included */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          What's Included in Our {serviceName}
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Complete system inspection",
            "Honest, upfront pricing",
            "Licensed & insured technicians",
            "Same-day service available",
            "100% satisfaction guarantee",
            "Clean, professional service",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Common Issues We Fix */}
      {service && getCommonIssues().length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Common {serviceName} Issues We Resolve
          </h2>
          <p className="text-base leading-relaxed mb-4">
            Our {cityName} technicians are experienced in diagnosing and repairing a wide range of HVAC problems. 
            Here are some of the most common issues we encounter:
          </p>
          <ul className="space-y-2 list-none pl-0">
            {getCommonIssues().map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{issue}</span>
              </li>
            ))}
          </ul>
          <p className="text-base leading-relaxed mt-4">
            If you're experiencing any of these problems—or something not listed here—don't hesitate to reach out. 
            Our team can quickly diagnose the issue and provide a transparent quote before any work begins.
          </p>
        </section>
      )}

      {/* Neighborhoods We Serve */}
      {showNeighborhoods && city.neighborhoods.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            {cityName} Neighborhoods We Serve
          </h2>
          <p className="text-base leading-relaxed mb-4">
            We're proud to serve residents throughout {cityName} and surrounding areas. Our technicians are 
            familiar with the unique HVAC needs of each neighborhood, from historic homes to new construction.
          </p>
          <div className="flex flex-wrap gap-2">
            {city.neighborhoods.map((neighborhood, idx) => (
              <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {neighborhood}
              </span>
            ))}
          </div>
          {city.zipCodes && city.zipCodes.length > 0 && (
            <p className="text-sm text-muted-foreground mt-3">
              Service ZIP codes: {city.zipCodes.join(", ")}
            </p>
          )}
        </section>
      )}

      {/* Seasonal Tips */}
      {showSeasonalTips && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Seasonal HVAC Tips for {cityName} Homeowners
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Summer Preparation
              </h3>
              <p className="text-base leading-relaxed">
                Before the heat arrives, schedule an AC tune-up to ensure peak efficiency. Replace air filters, 
                clear debris from your outdoor unit, and check refrigerant levels. {cityName} summers can be brutal, 
                and you don't want to be caught with a malfunctioning AC when temperatures soar into the 90s.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Winter Readiness
              </h3>
              <p className="text-base leading-relaxed">
                Fall is the perfect time to schedule furnace maintenance. Our technicians will inspect your heating system, 
                test safety controls, and ensure everything is ready for winter. Regular maintenance prevents costly mid-winter 
                breakdowns and keeps your {cityName} home warm and safe throughout the coldest months.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Emergency Service */}
      <section className="mb-8 bg-primary/5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          24/7 Emergency HVAC Service
        </h2>
        <p className="text-base leading-relaxed mb-3">
          HVAC emergencies don't wait for convenient times. That's why Vital Home Pros offers 24/7 emergency 
          service throughout {cityName} and {city.county} County. Whether it's a furnace failure on a frigid 
          January night or an AC breakdown during a summer heatwave, we're here to help—fast.
        </p>
        <p className="text-base leading-relaxed">
          Our emergency response team carries fully-stocked service vehicles and can handle most repairs on 
          the first visit. We believe in transparent pricing even during emergencies—no hidden fees or surprise charges.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Why {cityName} Residents Choose Vital Home Pros
        </h2>
        <div className="space-y-3">
          <p className="text-base leading-relaxed">
            <strong>Local Expertise:</strong> We know {cityName}'s climate, building codes, and utility incentive programs. 
            Our technicians understand how local weather patterns affect HVAC systems and can recommend solutions tailored 
            to your specific needs.
          </p>
          <p className="text-base leading-relaxed">
            <strong>Licensed & Insured:</strong> All our technicians are fully licensed in {stateName} and carry 
            comprehensive insurance. We maintain certifications from major HVAC manufacturers and stay current with 
            the latest industry training.
          </p>
          <p className="text-base leading-relaxed">
            <strong>Transparent Pricing:</strong> We provide detailed, written estimates before beginning any work. 
            You'll always know exactly what you're paying for, with no hidden fees or last-minute upcharges.
          </p>
          <p className="text-base leading-relaxed">
            <strong>Customer Satisfaction:</strong> Our 5-star Google rating reflects our commitment to exceptional service. 
            We're not satisfied until you're completely happy with the work we've done.
          </p>
        </div>
      </section>

      {/* Rebates & Incentives */}
      {city.rebates && (
        <section className="mb-8 bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-3">
            Available Rebates & Financing
          </h2>
          <p className="text-base leading-relaxed mb-3">{city.rebates}</p>
          <p className="text-base leading-relaxed">
            We'll help you identify all available incentives and handle the paperwork to maximize your savings. 
            Ask about our flexible financing options for qualifying customers.
          </p>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Related Services in {cityName}
          </h2>
          <p className="text-base leading-relaxed mb-4">
            Looking for additional HVAC services? We offer comprehensive heating and cooling solutions:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedServices.map((relatedService) => (
              <Link
                key={relatedService.slug}
                to={`/service-area/${city.state.toLowerCase()}/${city.slug}/${relatedService.slug}/`}
                className="block p-4 bg-card border rounded-lg hover:border-primary transition-colors no-underline"
              >
                <h3 className="font-semibold text-primary mb-1">{relatedService.label}</h3>
                <p className="text-sm text-muted-foreground">
                  Professional service in {cityName}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {showFAQ && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Do you offer same-day {serviceName.toLowerCase()} in {cityName}?
              </h3>
              <p className="text-base leading-relaxed">
                Yes! Subject to availability, we offer same-day service for most {serviceName.toLowerCase()} requests. 
                Call us early in the day for the best chance of same-day availability. Emergency service is available 24/7.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How much does {serviceName.toLowerCase()} cost in {cityName}?
              </h3>
              <p className="text-base leading-relaxed">
                Costs vary based on the specific service needed, equipment type, and severity of any issues. We provide 
                free estimates and upfront pricing before any work begins. Our service call fee is waived if you proceed 
                with the recommended repairs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Are your technicians licensed and insured?
              </h3>
              <p className="text-base leading-relaxed">
                Absolutely. All Vital Home Pros technicians are fully licensed in {stateName}, background-checked, 
                and carry comprehensive insurance. We maintain manufacturer certifications and ongoing training to 
                ensure we can service all major HVAC brands.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Do you serve areas outside {cityName}?
              </h3>
              <p className="text-base leading-relaxed">
                Yes! While we proudly serve {cityName}, we also cover the entire {city.county} County area and 
                surrounding communities throughout the Kansas City metro region. Call us to confirm service availability 
                in your specific location.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA paragraph */}
      <section className="mb-8 text-center bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">
          Ready to Schedule Your {serviceName}?
        </h2>
        <p className="text-base leading-relaxed">
          Don't wait for small problems to become expensive emergencies. Contact Vital Home Pros today for fast, 
          professional {serviceName.toLowerCase()} in {cityName}. Our friendly team is standing by to answer your 
          questions and schedule your appointment at a time that works for you.
        </p>
      </section>
    </div>
  );
}
