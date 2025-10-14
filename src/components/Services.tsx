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
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From routine maintenance to complete system installations, we handle it all with expertise and care.
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
