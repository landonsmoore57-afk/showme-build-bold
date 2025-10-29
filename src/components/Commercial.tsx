import { Building2, Users, Wrench, Clock, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { JobberDialog } from "./JobberDialog";

export const Commercial = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  const services = [
    {
      icon: Users,
      title: "Multi-Family Buildings",
      description:
        "Apartment complexes, condos, and townhomes. Expert maintenance and emergency service for property managers.",
    },
    {
      icon: Building2,
      title: "Commercial Properties",
      description:
        "Office buildings, retail spaces, restaurants, and warehouses. Complete HVAC solutions for your business.",
    },
    {
      icon: Wrench,
      title: "New Installations",
      description:
        "Commercial-grade systems sized and installed correctly. Energy-efficient solutions that reduce operating costs.",
    },
    {
      icon: Clock,
      title: "Preventive Maintenance",
      description:
        "Scheduled maintenance plans to prevent breakdowns. Keep tenants comfortable and equipment running efficiently.",
    },
  ];

  const benefits = [
    "Licensed & Insured Commercial Contractors",
    "24/7 Emergency Service Available",
    "Flexible Maintenance Contracts",
    "Property Manager Direct Line",
    "Volume Pricing Available",
    "Certified Commercial Technicians",
  ];

  return (
    <section id="commercial" className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, white 35px, white 36px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="label-patch text-secondary mb-4">Commercial Services</div>
          <h2 className="text-3xl md:text-4xl font-black mb-6">Multi-Family & Commercial HVAC Solutions</h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto mb-8" />
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Keeping Kansas City businesses and multi-family properties comfortable year-round. Professional service you
            can count on.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border-[3px] border-white/20 hover:bg-white/20 hover:border-secondary transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-white/90 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits & CTA */}
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border-[3px] border-white/20">
            <h3 className="text-xl font-bold mb-6">Why Property Managers Choose Us</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black mb-4">Need a Multi-Family Quote?</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Get a free estimate for your commercial property or multi-family building. We'll assess your needs and
              provide transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setQuoteDialogOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-white font-bold border-2 border-white shadow-glow-orange"
              >
                Request Multi-Family Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = "tel:+19133982500")}
                className="border-2 border-white/30 hover:border-white hover:bg-white hover:text-primary font-bold"
              >
                <Phone className="w-4 h-4 mr-2" />
                (913) 398-2500
              </Button>
            </div>
          </div>
        </div>
      </div>

      <JobberDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
    </section>
  );
};
