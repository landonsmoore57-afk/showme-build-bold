import { Snowflake, Flame, Wind, Thermometer, Droplets, Filter, Settings, Wrench, Shield } from "lucide-react";

export const Services = () => {
  const services = [
    {
      icon: Snowflake,
      title: "Air Conditioning Services",
      description: "Installation, repair, and maintenance for all AC systems and models."
    },
    {
      icon: Flame,
      title: "Heating Services",
      description: "Furnace installation, repair, and tune-ups to keep you warm all winter."
    },
    {
      icon: Wind,
      title: "Ductwork Services",
      description: "Duct cleaning, repair, and installation for optimal airflow."
    },
    {
      icon: Thermometer,
      title: "Thermostat Installation",
      description: "Smart and programmable thermostat installation and configuration."
    },
    {
      icon: Droplets,
      title: "Humidity Control",
      description: "Humidifier and dehumidifier installation for optimal comfort."
    },
    {
      icon: Filter,
      title: "Air Quality Solutions",
      description: "Air purifiers, filters, and ventilation systems for cleaner air."
    },
    {
      icon: Settings,
      title: "System Maintenance",
      description: "Preventive maintenance plans to extend your system's life."
    },
    {
      icon: Wrench,
      title: "Emergency Repairs",
      description: "24/7 emergency service for urgent heating and cooling issues."
    },
    {
      icon: Shield,
      title: "Warranty Service",
      description: "Comprehensive warranty coverage and protection plans."
    }
  ];

  return (
    <section id="services" className="relative">
      {/* Transition wave from navy to light */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary to-transparent"></div>
      
      <div className="py-20 bg-muted pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            {/* Clear residential focus */}
            <div className="inline-block mb-6 px-6 py-3 bg-white rounded-lg border-2 border-secondary/20">
              <div className="label-patch text-secondary mb-1">Now For Homeowners</div>
              <p className="text-xs text-muted-foreground font-bold">Residential HVAC Services</p>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
              Complete Home Comfort Solutions
            </h2>
            <div className="w-24 h-1 bg-secondary rounded-full mx-auto mb-8" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether it's a quick fix or a complete system upgrade, we've got the skills and the heart to do it right. Every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg border-[3px] border-primary/10 hover:border-secondary transition-all duration-300 hover:shadow-card group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-muted border-2 border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-secondary transition-all">
                    <service.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
