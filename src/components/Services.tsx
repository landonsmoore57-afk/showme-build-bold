import { Home, Paintbrush, Hammer, Wrench, Lightbulb, Droplet, DoorOpen, Building2, ClipboardCheck } from "lucide-react";

export const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Apartment Unit Renovations",
      description: "Complete transformations from outdated to market-ready units."
    },
    {
      icon: ClipboardCheck,
      title: "Tenant Turnover",
      description: "Fast, thorough turnovers including painting, flooring, and deep cleaning."
    },
    {
      icon: Home,
      title: "Kitchen & Bath Remodeling",
      description: "Modern updates that add value and appeal to your properties."
    },
    {
      icon: Paintbrush,
      title: "Drywall & Painting",
      description: "Professional finishes that make units shine."
    },
    {
      icon: Hammer,
      title: "Flooring Installation",
      description: "Durable, attractive flooring solutions for high-traffic spaces."
    },
    {
      icon: DoorOpen,
      title: "Carpentry & Trim Work",
      description: "Precision craftsmanship for doors, cabinets, and finishing touches."
    },
    {
      icon: Droplet,
      title: "Plumbing Repairs",
      description: "Reliable fixes for leaks, fixtures, and water systems."
    },
    {
      icon: Lightbulb,
      title: "Electrical Repairs",
      description: "Safe, code-compliant electrical work for all your needs."
    },
    {
      icon: Wrench,
      title: "Exterior & Maintenance",
      description: "Keep your property looking great and functioning properly."
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From routine maintenance to complete renovations, we handle it all with professionalism and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-secondary animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
