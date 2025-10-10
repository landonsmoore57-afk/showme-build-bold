import { Award, Heart, Clock, Shield } from "lucide-react";

export const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Family Values",
      description: "Built on loyalty, craftsmanship, and treating every project like it's our own home."
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Years of experience with apartment complexes, property managers, and general contracting."
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "We understand the importance of quick unit turns and reliable timelines."
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Licensed, insured, and committed to delivering exceptional workmanship every time."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            About Show-Me Contracting
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're a Missouri-based general contracting company that specializes in apartment and multi-family renovations. 
            Our team brings Show-Me State values to every project — reliability, clear communication, and honest work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {values.map((value, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
