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
    <section id="services" className="py-24 bg-gradient-to-b from-accent/5 via-secondary/5 to-background relative overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-secondary font-black text-sm tracking-widest uppercase">What We Do</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6 tracking-tight">
            Expert HVAC Services
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-secondary to-orange-600 rounded-full mx-auto mb-8 shadow-lg shadow-secondary/30" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Whether it's a quick fix or a complete system upgrade, we've got the skills and the heart to do it right. Every time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-accent/5 p-8 rounded-3xl shadow-[0_4px_20px_hsl(193_55%_37%_/_0.08)] hover:shadow-[0_12px_40px_hsl(193_55%_37%_/_0.18)] transition-all duration-500 hover:-translate-y-3 border-2 border-accent/30 hover:border-secondary/50 animate-fade-in group cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-secondary/30">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary mb-3 group-hover:text-secondary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
