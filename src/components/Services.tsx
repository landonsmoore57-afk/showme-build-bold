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
    <section id="services" className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1.5 bg-secondary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From routine maintenance to complete system installations, we handle it all with expertise and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-[0_4px_16px_hsl(205_55%_23%_/_0.08)] hover:shadow-[0_8px_32px_hsl(205_55%_23%_/_0.15)] transition-all duration-300 hover:-translate-y-2 border-2 border-accent/20 hover:border-secondary/30 animate-fade-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
