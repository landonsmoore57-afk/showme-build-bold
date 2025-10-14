import { Award, Heart, Clock, Shield } from "lucide-react";

export const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Family Values",
      description: "Built on trust, reliability, and treating every customer like family."
    },
    {
      icon: Award,
      title: "Certified Experts",
      description: "EPA-certified technicians with years of experience in residential and commercial HVAC."
    },
    {
      icon: Clock,
      title: "Fast Response",
      description: "24/7 emergency service with same-day appointments available."
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Licensed, insured, and committed to delivering comfort and peace of mind."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
            About Show-Me Air
          </h2>
          <div className="w-24 h-1.5 bg-secondary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're a Kansas City-based HVAC company specializing in heating, cooling, and air quality solutions. 
            Our team brings Show-Me State values to every service call — reliability, clear communication, and honest work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {values.map((value, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-white border-2 border-accent/30 hover:border-secondary/40 hover:shadow-[0_8px_32px_hsl(205_55%_23%_/_0.12)] transition-all duration-300 hover:-translate-y-2 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
