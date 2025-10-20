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
    <section id="about" className="py-24 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* Geometric background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-secondary font-black text-sm tracking-widest uppercase">Who We Are</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6 tracking-tight">
            Your Comfort, Our Craft
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-secondary to-orange-600 rounded-full mx-auto mb-8 shadow-lg shadow-secondary/30" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            At Show-Me Air, we believe in doing things the Missouri way — honest work, fair prices, and treating every customer like family. Proudly serving Kansas City, Overland Park, Lee's Summit, and surrounding communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {values.map((value, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-white to-accent/5 border-2 border-accent/30 hover:border-secondary/50 hover:shadow-[0_12px_40px_hsl(193_55%_37%_/_0.15)] transition-all duration-500 hover:-translate-y-3 animate-fade-in group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-accent/20">
                <value.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-black text-primary mb-4 group-hover:text-secondary transition-colors">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
