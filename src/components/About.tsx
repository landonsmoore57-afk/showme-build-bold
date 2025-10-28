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
    <section id="about" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="label-patch text-secondary mb-4">Who We Are</div>
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
            Your Comfort, Our Craft
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Vital Home Pros, we believe in doing things the Missouri way — honest work, fair prices, and treating every customer like family. Proudly serving Kansas City, Overland Park, Lee's Summit, and surrounding communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-muted border-2 border-primary/10 hover:border-secondary transition-all duration-300 hover:shadow-card group"
            >
              <div className="w-16 h-16 bg-white rounded-lg border-2 border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:border-secondary transition-all">
                <value.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
